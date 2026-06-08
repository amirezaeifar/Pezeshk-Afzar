import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'
import './style.css'

const messages = {
  en: {
    brand: 'Pezeshk Afza',
    nav: {
      home: 'Home',
      products: 'Products',
      about: 'About',
      contact: 'Contact',
    },
    hero: {
      eyebrow: 'Medical Engineering Software',
      titleA: 'Engineering',
      titleB: 'the future of',
      titleC: 'healthcare software.',
      subtitle:
        'We build precision software for hospitals — from real-time surgical instrument tracking to clinical workflow automation. Designed with engineers, validated in operating rooms.',
      ctaPrimary: 'View products',
      ctaSecondary: 'Talk to our team',
      scroll: 'Explore',
    },
    stats: {
      eyebrow: 'In numbers',
      one: { value: '12+', label: 'Hospital partners' },
      two: { value: '99.7%', label: 'Detection accuracy' },
      three: { value: '< 40 ms', label: 'Inference latency' },
      four: { value: '6', label: 'Production systems' },
    },
    why: {
      eyebrow: 'Why Pezeshk Afza',
      title: 'Built to clinical standards. Engineered for daily use.',
      sub: 'Every system we ship is reviewed by surgeons, biomedical engineers, and hospital IT before it touches a patient pathway.',
      items: {
        accuracy: {
          title: 'Verified accuracy',
          body: 'Computer-vision models trained on annotated OR footage, benchmarked against clinical ground truth.',
        },
        reliability: {
          title: 'Hospital-grade reliability',
          body: 'On-prem deployment, offline-capable inference, redundant data paths. ISO 13485 aligned processes.',
        },
        innovation: {
          title: 'Continuous innovation',
          body: 'Edge inference on Basler Pro 2 cameras, modular pipelines, regular model updates with audit logs.',
        },
      },
    },
    section: {
      eyebrow: 'Our products',
      featured: 'Software for the modern hospital',
      featuredSub:
        'Six production systems, each addressing a measurable problem inside the clinical pathway.',
      count: '06 systems',
      viewAll: 'View all products',
    },
    card: {
      view: 'Learn more',
      no: 'P/',
    },
    products: {
      eyebrow: 'Product catalogue',
      titleA: 'Our',
      titleB: 'products.',
      intro:
        'A complete software stack for hospitals — from the operating room to administration. Each product can run standalone or integrate with your HIS / PACS.',
      featuresLabel: 'Capabilities',
      demo: 'Request a demo',
      details: 'Technical brief',
    },
    about: {
      eyebrow: 'About',
      titleA: 'A medical-engineering',
      titleB: 'practice.',
      lead:
        'We are a small, deliberate team of engineers, clinicians, and designers building software that hospitals actually use. Founded in 2021 — shipping since 2022.',
      missionTitle: 'Our mission',
      missionBody:
        'To bring measurable precision to clinical work. We translate problems surgeons describe at the scrub sink into validated software running on hospital hardware.',
      storyTitle: 'How we got here',
      storyBody:
        'Pezeshk Afza began as a research collaboration between a Tehran teaching hospital and a computer-vision lab. A six-month pilot tracking surgical instruments in real time became our first product — and the basis for everything since.',
      teamEyebrow: 'The team',
      teamTitle: 'Engineers and clinicians, working in the same room.',
      members: {
        m1: { name: 'Dr. Sara Tehrani', role: 'Chief Medical Officer' },
        m2: { name: 'Arman Hosseini', role: 'Head of Computer Vision' },
        m3: { name: 'Niloofar Karimi', role: 'Lead Clinical Engineer' },
        m4: { name: 'Reza Bahari', role: 'Software Architect' },
      },
      certEyebrow: 'Standards & compliance',
      certTitle: 'Aligned with the standards that matter.',
      certs: {
        c1: 'ISO 13485 (in process)',
        c2: 'IEC 62304 software lifecycle',
        c3: 'GDPR & HIPAA aligned',
        c4: 'On-prem & air-gapped deployment',
      },
    },
    footer: {
      manifesto: 'Precision software for hospitals — engineered, validated, supported.',
      tagline: 'Engineering precise software solutions for modern healthcare.',
      rights: 'All rights reserved.',
      columns: {
        navigate: 'Navigate',
        contact: 'Contact',
      },
      contact: {
        emailLabel: 'Email',
        phoneLabel: 'Phone',
        addressLabel: 'Address',
        address: 'Mashhad — Ferdowsi University, AI in Medicine Building',
      },
      social: {
        linkedin: 'LinkedIn',
        instagram: 'Instagram',
        telegram: 'Telegram',
      },
    },
    lang: { switch: 'فا' },
    contact: {
      eyebrow: 'Get in touch',
      titleA: 'Talk to',
      titleB: 'our team.',
      intro:
        'For demos, procurement enquiries, partnerships, or technical questions. We typically respond within two working days.',
      meta: {
        studio: 'Office',
        studioVal: 'Tehran · Iran',
        hours: 'Hours',
        hoursVal: 'Sat — Wed, 09:00 — 18:00',
        email: 'Email',
        emailVal: 'hello@pezeshk-afza.com',
      },
      form: {
        section: 'Send a message',
        name: 'Full name',
        namePh: 'Your name',
        email: 'Work email',
        emailPh: 'you@hospital.com',
        phone: 'Phone number',
        phonePh: 'Optional — +98 21 …',
        subject: 'Subject',
        subjectPh: 'Demo request, procurement, partnership…',
        message: 'Message',
        messagePh: 'Briefly describe your need or question.',
        submit: 'Send message',
        sending: 'Sending…',
      },
      success: {
        title: 'Thank you — your message has been received.',
        body: 'A member of our team will be in touch within two working days.',
        again: 'Send another',
      },
      errors: {
        required: 'This field is required.',
        email: 'Please enter a valid email address.',
        minMessage: 'Message must be at least 20 characters.',
        summary: 'Please correct the highlighted fields.',
      },
    },
  },
  fa: {
    brand: 'پزشک‌افزا',
    nav: {
      home: 'خانه',
      products: 'محصولات',
      about: 'درباره ما',
      contact: 'تماس با ما',
    },
    hero: {
      eyebrow: 'نرم‌افزار مهندسی پزشکی',
      titleA: 'مهندسیِ',
      titleB: 'آیندهٔ',
      titleC: 'نرم‌افزار سلامت.',
      subtitle:
        'ما نرم‌افزارهای دقیق برای بیمارستان‌ها می‌سازیم — از ردیابی بلادرنگ ابزار جراحی تا اتوماسیون فرآیندهای بالینی. طراحی‌شده توسط مهندسان، اعتبارسنجی‌شده در اتاق عمل.',
      ctaPrimary: 'مشاهدهٔ محصولات',
      ctaSecondary: 'گفتگو با تیم ما',
      scroll: 'بیشتر',
    },
    stats: {
      eyebrow: 'در یک نگاه',
      one: { value: '+۱۲', label: 'بیمارستان همکار' },
      two: { value: '٪۹۹٫۷', label: 'دقت تشخیص' },
      three: { value: '< ۴۰ms', label: 'تأخیر پردازش' },
      four: { value: '۶', label: 'سامانهٔ عملیاتی' },
    },
    why: {
      eyebrow: 'چرا پزشک‌افزا',
      title: 'با استانداردهای بالینی ساخته شده. برای استفادهٔ روزانه مهندسی شده.',
      sub: 'هر سامانه‌ای که ارائه می‌دهیم پیش از ورود به مسیر درمانی، توسط جراحان، مهندسان زیست‌پزشکی و IT بیمارستانی بازبینی می‌شود.',
      items: {
        accuracy: {
          title: 'دقت تأیید‌شده',
          body: 'مدل‌های بینایی ماشین آموزش‌دیده روی ویدئوی برچسب‌خوردهٔ اتاق عمل، ارزیابی‌شده با داده‌های بالینی مرجع.',
        },
        reliability: {
          title: 'پایداری بیمارستانی',
          body: 'استقرار درون‌سازمانی، اجرای آفلاین، مسیرهای داده افزونه. مطابق با ISO 13485.',
        },
        innovation: {
          title: 'نوآوری مستمر',
          body: 'پردازش لبه‌ای روی دوربین‌های Basler Pro 2، خطوط ماژولار، به‌روزرسانی منظم مدل‌ها همراه با لاگ ممیزی.',
        },
      },
    },
    section: {
      eyebrow: 'محصولات ما',
      featured: 'نرم‌افزار برای بیمارستان مدرن',
      featuredSub:
        'شش سامانهٔ عملیاتی، هرکدام پاسخی به یک مسئلهٔ مشخص در مسیر درمان.',
      count: '۰۶ سامانه',
      viewAll: 'مشاهدهٔ همه',
    },
    card: {
      view: 'اطلاعات بیشتر',
      no: 'م/',
    },
    products: {
      eyebrow: 'فهرست محصولات',
      titleA: 'محصولات',
      titleB: 'ما.',
      intro:
        'یک پشتهٔ نرم‌افزاری کامل برای بیمارستان — از اتاق عمل تا واحد اداری. هر محصول می‌تواند مستقل یا یکپارچه با HIS / PACS شما کار کند.',
      featuresLabel: 'قابلیت‌ها',
      demo: 'درخواست دمو',
      details: 'مستندات فنی',
    },
    about: {
      eyebrow: 'درباره ما',
      titleA: 'یک مجموعهٔ',
      titleB: 'مهندسی پزشکی.',
      lead:
        'ما تیمی کوچک و سنجیده از مهندسان، پزشکان و طراحان هستیم که نرم‌افزاری می‌سازیم که واقعاً در بیمارستان استفاده می‌شود. تأسیس در ۱۴۰۰ — تحویل از ۱۴۰۱.',
      missionTitle: 'مأموریت ما',
      missionBody:
        'وارد کردن دقت قابل‌اندازه‌گیری به کار بالینی. ما مسائلی که جراحان کنار سینک می‌گویند را به نرم‌افزارِ معتبر و در حال اجرا روی سخت‌افزار بیمارستان ترجمه می‌کنیم.',
      storyTitle: 'چگونه به اینجا رسیدیم',
      storyBody:
        'پزشک‌افزا با همکاری پژوهشی یک بیمارستان آموزشی در تهران و یک آزمایشگاه بینایی ماشین آغاز شد. یک پایلوت شش‌ماهه برای ردیابی بلادرنگ ابزار جراحی به نخستین محصول ما تبدیل شد — و پایهٔ هر چیزی که از آن پس ساخته‌ایم.',
      teamEyebrow: 'تیم',
      teamTitle: 'مهندسان و پزشکان، در یک اتاق.',
      members: {
        m1: { name: 'دکتر سارا تهرانی', role: 'مدیر ارشد پزشکی' },
        m2: { name: 'آرمان حسینی', role: 'رئیس بینایی ماشین' },
        m3: { name: 'نیلوفر کریمی', role: 'مهندس ارشد بالینی' },
        m4: { name: 'رضا بهاری', role: 'معمار نرم‌افزار' },
      },
      certEyebrow: 'استانداردها و انطباق',
      certTitle: 'منطبق با استانداردهایی که اهمیت دارند.',
      certs: {
        c1: 'ISO 13485 (در حال دریافت)',
        c2: 'چرخهٔ عمر نرم‌افزار IEC 62304',
        c3: 'منطبق با GDPR و HIPAA',
        c4: 'استقرار درون‌سازمانی و ایزوله',
      },
    },
    footer: {
      manifesto: 'نرم‌افزار دقیق برای بیمارستان — مهندسی‌شده، اعتبارسنجی‌شده، پشتیبانی‌شده.',
      tagline: 'نرم‌افزارهای دقیق برای مراقبت‌های بهداشتی مدرن.',
      rights: 'تمامی حقوق محفوظ است.',
      columns: {
        navigate: 'دسترسی سریع',
        contact: 'تماس',
      },
      contact: {
        emailLabel: 'ایمیل',
        phoneLabel: 'تلفن',
        addressLabel: 'نشانی',
        address: 'مشهد — دانشگاه فردوسی، ساختمان هوش مصنوعی در پزشکی',
      },
      social: {
        linkedin: 'لینکدین',
        instagram: 'اینستاگرام',
        telegram: 'تلگرام',
      },
    },
    lang: { switch: 'EN' },
    contact: {
      eyebrow: 'با ما در تماس باشید',
      titleA: 'گفتگو با',
      titleB: 'تیم ما.',
      intro:
        'برای دمو، استعلام خرید، همکاری، یا سوال فنی. معمولاً ظرف دو روز کاری پاسخ می‌دهیم.',
      meta: {
        studio: 'دفتر',
        studioVal: 'تهران · ایران',
        hours: 'ساعات کاری',
        hoursVal: 'شنبه تا چهارشنبه، ۹ تا ۱۸',
        email: 'ایمیل',
        emailVal: 'hello@pezeshk-afza.com',
      },
      form: {
        section: 'ارسال پیام',
        name: 'نام و نام خانوادگی',
        namePh: 'نام شما',
        email: 'ایمیل کاری',
        emailPh: 'you@hospital.com',
        phone: 'شمارهٔ تماس',
        phonePh: 'اختیاری — ۰۲۱ ۸۸ …',
        subject: 'موضوع',
        subjectPh: 'درخواست دمو، خرید، همکاری…',
        message: 'پیام',
        messagePh: 'به اختصار نیاز یا سوال خود را شرح دهید.',
        submit: 'ارسال پیام',
        sending: 'در حال ارسال…',
      },
      success: {
        title: 'سپاسگزاریم — پیام شما دریافت شد.',
        body: 'یکی از اعضای تیم ما ظرف دو روز کاری با شما تماس خواهد گرفت.',
        again: 'ارسال پیام دیگر',
      },
      errors: {
        required: 'این فیلد الزامی است.',
        email: 'لطفاً یک نشانی ایمیل معتبر وارد کنید.',
        minMessage: 'پیام باید حداقل ۲۰ کاراکتر داشته باشد.',
        summary: 'لطفاً فیلدهای مشخص‌شده را اصلاح کنید.',
      },
    },
  },
}

const i18n = createI18n({
  legacy: false,
  locale: 'fa',
  fallbackLocale: 'en',
  messages,
})

document.documentElement.setAttribute('dir', 'rtl')
document.documentElement.setAttribute('lang', 'fa')

createApp(App).use(router).use(i18n).mount('#app')
