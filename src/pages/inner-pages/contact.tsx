import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import NavbarOne from "../../components/navbar/navbar-one";
import ScrollToTop from "../../components/scroll-to-top";

import bg from '../../assets/img/shortcode/breadcumb.jpg'
import contactImg from '../../assets/img/thumb/contact-thumb.jpg'
import letter from '../../assets/img/svg/letter.svg'

import Aos from "aos";
import FooterTwo from "../../components/footer/footer-two";

export default function Contact() {
    useEffect(()=>{
        Aos.init()
    },[])

    // Add refs and state for height sync
    const formRef = useRef<HTMLDivElement>(null);
    const [formHeight, setFormHeight] = useState<number | undefined>(undefined);

    useEffect(() => {
        if (formRef.current) {
            setFormHeight(formRef.current.offsetHeight);
        }
        // Update on window resize
        const handleResize = () => {
            if (formRef.current) {
                setFormHeight(formRef.current.offsetHeight);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Toast state
    const [toast, setToast] = useState<string | null>(null);
    const [toastVisible, setToastVisible] = useState(false);
    // Form state
    const [form, setForm] = useState({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    const [errors, setErrors] = useState<any>({});

    const validate = () => {
      const errs: any = {};
      if (!form.name.trim()) errs.name = 'Full name is required.';
      if (!form.email.trim()) errs.email = 'Email is required.';
      else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = 'Invalid email format.';
      if (!form.phone.trim()) errs.phone = 'Phone number is required.';
      else if (!/^\d{10,}$/.test(form.phone)) errs.phone = 'Enter a valid phone number.';
      if (!form.subject) errs.subject = 'Please select a subject.';
      if (!form.message.trim()) errs.message = 'Message is required.';
      return errs;
    };

    const handleChange = (e: any) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: any) => {
      e.preventDefault();
      const errs = validate();
      setErrors(errs);
      if (Object.keys(errs).length === 0) {
        setToast('Message sent successfully!');
        setToastVisible(true);
        setTimeout(() => {
          setToastVisible(false);
          setToast(null);
          window.location.reload();
        }, 2000);
      }
    };

  return (
    <>
        <NavbarOne/>

        <div className="flex items-center gap-4 flex-wrap bg-overlay p-14 sm:p-16 before:bg-title before:bg-opacity-70" style={{backgroundImage:`url(${bg})`}}>
            <div className="text-center w-full">
                <h2 className="text-white text-8 md:text-[40px] font-normal leading-none text-center">Contact Us</h2>
                <ul className="flex items-center justify-center gap-[10px] text-base md:text-lg leading-none font-normal text-white mt-3 md:mt-4">
                    <li><Link to="/">Home</Link></li>
                    <li>/</li>
                    <li className="text-primary">Contact</li>
                </ul>
            </div>
        </div>

        <div className="s-pb-100 s-pt-100">
            <div className="container-fluid">
                <div className="max-w-[1720px] mx-auto flex justify-between gap-8 items-stretch">
                    <div className="max-w-[894px] w-full hidden lg:block" data-aos="zoom-in" style={{ height: formHeight ? formHeight : 'auto' }}>
                        <img className="w-full h-full object-cover" src={contactImg} alt="contct"/>
                    </div>
                    <div ref={formRef} className="max-w-[725px] w-full mx-auto lg:mx-0 h-full flex flex-col justify-stretch">
                        <div data-aos="fade-up">
                            <img src={letter} className="size-16" alt="Contact Icon" />
                            <h3 className="leading-none font-medium mt-3 md:mt-6 text-2xl">Get in Touch</h3>
                            <p className="max-w-[474px] mt-3 md:mt-4 font-medium">We're here to address your inquiries, feedback, and partnership opportunities promptly and effectively. </p>
                        </div>
                        <div className="mt-8" data-aos="fade-up" data-aos-delay="100">
                            <form onSubmit={handleSubmit} noValidate>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-5 sm:gap-6">
                                    <div>
                                        <label className="text-base md:text-lg text-title dark:text-white leading-none mb-2.5 block">Full Name</label>
                                        <input className="w-full h-12 md:h-14 bg-snow dark:bg-dark-secondary border border-[#E3E5E6] text-title dark:text-white focus:border-primary p-4 outline-none duration-300" type="text" name="name" placeholder="Enter your full name" value={form.name} onChange={handleChange}/>
                                        {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                                    </div>
                                    <div>
                                        <label className="text-base md:text-lg text-title dark:text-white leading-none mb-2.5 block">Email</label>
                                        <input className="w-full h-12 md:h-14 bg-snow dark:bg-dark-secondary border border-[#E3E5E6] text-title dark:text-white focus:border-primary p-4 outline-none duration-300" type="email" name="email" placeholder="Enter your email address" value={form.email} onChange={handleChange}/>
                                        {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                                    </div>
                                    <div>
                                        <label className="text-base md:text-lg text-title dark:text-white leading-none mb-2.5 block">Phone No.</label>
                                        <input className="w-full h-12 md:h-14 bg-snow dark:bg-dark-secondary border border-[#E3E5E6] text-title dark:text-white focus:border-primary p-4 outline-none duration-300" type="number" name="phone" placeholder="Type your phone number" value={form.phone} onChange={handleChange}/>
                                        {errors.phone && <div className="text-red-500 text-sm mt-1">{errors.phone}</div>}
                                    </div>
                                    <div>
                                        <label className="text-base md:text-lg text-title dark:text-white leading-none mb-2.5 block">Subject</label>
                                        <select className="w-full h-12 md:h-14 bg-snow dark:bg-dark-secondary border border-[#E3E5E6] text-slate-400  focus:border-primary p-4 outline-none duration-300" name="subject" value={form.subject} onChange={handleChange} title="Subject"> 
                                            <option value="">Select Subject</option>
                                            <option value="Payment Problem">Payment Problem</option>
                                            <option value="Furniture Problem">Service Issue</option>
                                            <option value="Agreement Problem">Return Items</option>
                                            <option value="Carrying Problem">Other Issue</option>
                                        </select>
                                        {errors.subject && <div className="text-red-500 text-sm mt-1">{errors.subject}</div>}
                                    </div>
                                </div>
                                <div className="mt-5 sm:gap-6">
                                    <label className="text-base md:text-lg text-title dark:text-white leading-none mb-2.5 block">Your Message</label>
                                    <textarea className="w-full h-28 md:h-[170px] bg-snow dark:bg-dark-secondary border border-[#E3E5E6] text-title dark:text-white focus:border-primary p-4 outline-none duration-300" name="message" placeholder="Type your message" value={form.message} onChange={handleChange}></textarea>
                                    {errors.message && <div className="text-red-500 text-sm mt-1">{errors.message}</div>}
                                </div>
                                <div className="mt-5">
                                    <button type="submit" className="btn btn-solid w-full" data-text="Submit">
                                        <span>Submit</span>
                                    </button>
                                </div>
                            </form>
                            {toastVisible && (
                                <div className="fixed left-1/2 top-1/2 z-50 bg-white dark:bg-title text-title dark:text-white px-6 py-3 rounded shadow-lg border-l-4 border-green-500 animate-toastify font-semibold transition-all duration-300" style={{minWidth:'220px', transform: 'translate(-50%, -50%)'}}>
                                    <span>{toast}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    <div className="s-pb-100" data-aos="fade-up">
        <div className="container-fluid">
            <div className="max-w-[1720px] mx-auto">
                <iframe className="w-full h-[400px] md:h-[600px]" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14280.981120763789!2d80.2706526!3d26.5122348!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c379d089e4569%3A0x7f087cfc3f1c0076!2sIndira%20Nagar%2C%20Kalyanpur%2C%20Kanpur%2C%20Uttar%20Pradesh%20208026!5e0!3m2!1sen!2sin!4v1751727720414!5m2!1sen!2sin" style={{border:'0'}}></iframe>
            </div>
        </div>
    </div>

    <FooterTwo/>

    <ScrollToTop/>
    <style>{`
@keyframes toastify {
  0% { opacity: 0; transform: translateX(100%); }
  20% { opacity: 1; transform: translateX(0); }
  80% { opacity: 1; transform: translateX(0); }
  100% { opacity: 0; transform: translateX(100%); }
}
.animate-toastify {
  animation: toastify 2s;
}
`}</style>
    </>
  )
}
