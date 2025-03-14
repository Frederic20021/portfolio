import { NextRequest, NextResponse } from "next/server";
import { IncomingForm, Fields, Files, File } from "formidable";
import { Readable } from "stream";
import fs from "fs/promises";
import path from "path";
import { exec } from "child_process";
import translate from "google-translate-api";
import gtts from "google-tts-api";

export const config = {
    api: {
        bodyParser: false,
    },
};

// Convert NextRequest to a readable stream for Formidable
async function convertRequestToStream(req: NextRequest) {
    const reader = req.body?.getReader();
    if (!reader) throw new Error("ReadableStream reader not available");

    const stream = new Readable({
        async read() {
            const { done, value } = await reader.read();
            if (done) {
                this.push(null);
            } else {
                this.push(value);
            }
        },
    });

    return stream;
}

export async function POST(req: NextRequest) {
    try {
        const form = new IncomingForm({
            multiples: false,
        });

        // Convert NextRequest to a Readable Stream
        const stream = await convertRequestToStream(req);

        // Manually set headers that Formidable expects
        (req as any).headers = {
            "content-length": req.headers.get("content-length") || "0",
            "content-type": req.headers.get("content-type") || "",
        };

        return new Promise<NextResponse>((resolve) => {
            form.parse(req as any, async (err: Error | null, fields: Fields, files: Files) => {
                if (err) {
                    resolve(NextResponse.json({ error: "File upload error" }, { status: 500 }));
                    return;
                }

                const audioFile = files.audio?.[0] as File;
                if (!audioFile) {
                    resolve(NextResponse.json({ error: "No audio file provided" }, { status: 400 }));
                    return;
                }

                const tempPath = audioFile.filepath;
                const outputTextPath = path.join("/tmp", "transcription.txt");

                exec(`whisper.cpp -m base -f ${tempPath} -o ${outputTextPath}`, async (error) => {
                    if (error) {
                        resolve(NextResponse.json({ error: "Failed to transcribe audio" }, { status: 500 }));
                        return;
                    }

                    const transcript = (await fs.readFile(outputTextPath, "utf-8")).trim();
                    const translatedText = await translate(transcript, { to: "ja" });
                    const speechUrl = gtts.getAudioUrl(translatedText.text, { lang: "ja", slow: false });

                    resolve(NextResponse.json({ transcript, translated: translatedText.text, audioUrl: speechUrl }));
                });
            });
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
