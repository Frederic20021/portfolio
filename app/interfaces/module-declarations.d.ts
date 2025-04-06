// Type definitions for rabbit-node
declare module 'rabbit-node' {
    /**
     * Converts text from Zawgyi encoding to Unicode
     * @param text - The Zawgyi encoded text to convert
     * @returns The Unicode encoded text
     */
    export function zg2uni(text: string): string;

    /**
     * Converts text from Unicode encoding to Zawgyi
     * @param text - The Unicode encoded text to convert
     * @returns The Zawgyi encoded text
     */
    export function uni2zg(text: string): string;
}

// Type definitions for myanmar-tools
declare module 'myanmar-tools' {
    /**
     * ZawgyiDetector provides methods to determine if a string is encoded in Zawgyi.
     */
    export class ZawgyiDetector {
        constructor();

        /**
         * Computes the Zawgyi probability for a string.
         * @param text - The string to evaluate
         * @returns A probability between 0.0 and 1.0 that the string is Zawgyi encoded
         */
        getZawgyiProbability(text: string): number;
    }
}