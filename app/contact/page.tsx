"use client"
import React, {useRef, useState} from 'react'
import emailjs from '@emailjs/browser'
import Image from 'next/image'


const Contact = () => {
    const formRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: '',
        email: '',
        message: ''
    })

    const handleChange = ({ target : { name, value }} : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm( { ...form, [name]: value } );
    }

    //service_mvj6kjl
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        try {
            await emailjs.send(
                'service_mvj6kjl',
                'template_8l3j228',
                {
                    from_name: form.name,
                    to_name: 'SI THU LIN',
                    from_email: form.email,
                    to_email: 'sithulin123.bf@outlook.com',

                    message: form.message
                },
                '6QoeQf_j3aOl01Tut'
            )

            setLoading(false);

            alert('Your message has been sent.')

            setForm({
                name: " ",
                email: " ",
                message: " "
            });

        } catch (e) {
            console.log(e);
        }

    }
    return (
        <section className={"c-space my-20 mt-[4rem]"}>
            <div className={"relative min-h-screen flex items-center justify-center flex-col"}>
                <Image
                    src={"/assets/terminal.png"}
                    alt={"terminal background"}
                    className={"absolute inset-0 min-h-screen"}
                    width={200}
                    height={200}
                    style={{
                        width: '100%',
                        height: 'auto',
                    }}
                />
                <div className={"contact-container z-10"}>
                    <h3 className={"head-text"}>Let&apos;s talk</h3>
                    <p className={"text-lg text-white-600 mt-3"}>
                        If you are looking to apply to a Japanese Univeristy and need help, I am here to help.
                    </p>

                    <form ref={formRef} onSubmit={handleSubmit} className={"mt-12 flex flex-col space-y-7"}>
                        <label className={"space-y-3"}>
                            <span className={"field-label"}>Full Name</span>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className={"field-input"}
                                placeholder={"John Doe"}
                            />
                        </label>
                        <label className={"space-y-3"}>
                            <span className={"field-label"}>Email</span>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className={"field-input"}
                                placeholder={"johndoe@example.com"}
                            />
                        </label>
                        <label className={"space-y-3"}>
                            <span className={"field-label"}>Your Message</span>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                className={"field-input"}
                                placeholder={"Hi, I'm interested in ..."}
                            />
                        </label>
                        <button className={"field-btn"} type={"submit"} disabled={loading}>
                            {loading ? 'Sending...' : 'Send Message'}

                            <Image src={"/assets/arrow-up.png"} alt={"arrow-up"} className={"field-btn_arrow"} width={0} height={0} sizes={"100vh"} />
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}
export default Contact
