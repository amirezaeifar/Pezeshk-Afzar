// ── Product catalogue (static) ─────────────────────────────────────
// Pezeshk Afzar delivers an integrated portfolio of medical SOFTWARE and
// medical EQUIPMENT. Each record is self-contained: there is no backend
// and no runtime store — the views import this array directly and render
// it as a static, multi-page showcase.
//
// Schema
//   id            unique slug, used as the /products/:id route param
//   number        display index (e.g. "01")
//   type          'software' | 'equipment'
//   flagship      optional highlight flag
//   name          { en, fa }
//   category      { en, fa }   — e.g. "Innovative Equipment" / "تجهیزات خلاقانه"
//   tagline       { en, fa }
//   description    { en, fa }   — general description for the detail page
//   features      { en: [], fa: [] }
//   specs         [ { label: { en, fa }, value: { en, fa } } ]  — technical specifications
//   certifications{ en: [], fa: [] }  — licenses / certifications
//   image         hero image URL
//   span          'normal' | 'wide'  — homepage grid sizing

export const products = [
  {
    id: 'clinicos',
    number: '01',
    type: 'software',
    flagship: true,
    name: { en: 'ClinicOS', fa: 'کلینیک‌اواس' },
    category: { en: 'Hospital Information System', fa: 'سامانهٔ اطلاعات بیمارستانی' },
    tagline: {
      en: 'Unified hospital management & patient records.',
      fa: 'مدیریت یکپارچهٔ بیمارستان و پروندهٔ بیماران.',
    },
    description: {
      en: 'A modern Hospital Information System that replaces fragmented spreadsheets and legacy software. ClinicOS unifies patient records, admissions, billing, and inter-department clinical pathways inside a single, role-aware interface — and connects directly to the medical equipment Pezeshk Afzar deploys on the ward.',
      fa: 'یک سامانهٔ اطلاعات بیمارستانی مدرن که جایگزین صفحه‌گسترده‌های پراکنده و نرم‌افزارهای قدیمی می‌شود. کلینیک‌اواس پروندهٔ بیمار، پذیرش، صورت‌حساب و مسیرهای بالینی بین‌بخشی را در یک واسط واحد و مبتنی بر نقش متحد می‌کند و مستقیماً به تجهیزات پزشکی مستقرشده توسط پزشک‌افزار متصل می‌شود.',
    },
    features: {
      en: [
        'Unified patient records with full audit history',
        'Role-based access for clinical, administrative & billing staff',
        'HL7 / FHIR interfaces for laboratory and imaging integration',
      ],
      fa: [
        'پروندهٔ یکپارچهٔ بیمار با تاریخچهٔ کامل ممیزی',
        'دسترسی مبتنی بر نقش برای کادر بالینی، اداری و صورت‌حساب',
        'واسط‌های HL7 / FHIR برای اتصال آزمایشگاه و تصویربرداری',
      ],
    },
    specs: [
      { label: { en: 'Deployment', fa: 'استقرار' }, value: { en: 'On-premise or private cloud', fa: 'درون‌سازمانی یا ابر خصوصی' } },
      { label: { en: 'Interoperability', fa: 'هم‌کنش‌پذیری' }, value: { en: 'HL7 v2, FHIR R4, DICOM', fa: 'HL7 v2، FHIR R4، DICOM' } },
      { label: { en: 'Concurrent users', fa: 'کاربران هم‌زمان' }, value: { en: 'Up to 5,000', fa: 'تا ۵۰۰۰' } },
      { label: { en: 'Data residency', fa: 'محل نگه‌داری داده' }, value: { en: 'In-country, air-gap capable', fa: 'داخل کشور، قابل ایزوله‌سازی' } },
    ],
    certifications: {
      en: ['IEC 62304 software lifecycle', 'ISO 13485 aligned processes', 'ISO/IEC 27001 information security'],
      fa: ['چرخهٔ عمر نرم‌افزار IEC 62304', 'فرآیندهای منطبق با ISO 13485', 'امنیت اطلاعات ISO/IEC 27001'],
    },
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80',
    span: 'wide',
  },
  {
    id: 'radiantimage',
    number: '02',
    type: 'software',
    name: { en: 'RadiantImage', fa: 'رادیانت‌ایمیج' },
    category: { en: 'Medical Imaging', fa: 'تصویربرداری پزشکی' },
    tagline: {
      en: 'Diagnostic imaging & reading assistance.',
      fa: 'تصویربرداری تشخیصی و کمک به گزارش‌دهی.',
    },
    description: {
      en: 'A DICOM-native viewer with diagnostic-assist models for chest radiography, CT, and MRI. Designed for radiologists who want a validated pre-read, not a replacement — every model output is auditable and can be dismissed by the reporting physician.',
      fa: 'یک نمایشگر بومی DICOM با مدل‌های کمک‌تشخیصی برای رادیوگرافی قفسهٔ سینه، CT و MRI. طراحی‌شده برای رادیولوژیست‌هایی که پیش‌خوانیِ معتبر می‌خواهند، نه جایگزینی — خروجی هر مدل قابل ممیزی است و پزشک گزارش‌دهنده می‌تواند آن را رد کند.',
    },
    features: {
      en: [
        'DICOM-native viewer with multiplanar reconstruction',
        'Pre-read models for chest radiography, CT chest, and brain MRI',
        'PACS integration with on-premise or cloud deployment',
      ],
      fa: [
        'نمایشگر بومی DICOM با بازسازی چندصفحه‌ای',
        'مدل‌های پیش‌خوانی برای رادیوگرافی سینه، CT سینه و MRI مغز',
        'یکپارچگی با PACS، استقرار درون‌سازمانی یا ابری',
      ],
    },
    specs: [
      { label: { en: 'Modalities', fa: 'مدالیته‌ها' }, value: { en: 'CR, DR, CT, MRI, US', fa: 'CR، DR، CT، MRI، سونوگرافی' } },
      { label: { en: 'Standard', fa: 'استاندارد' }, value: { en: 'DICOM 3.0, IHE profiles', fa: 'DICOM 3.0، پروفایل‌های IHE' } },
      { label: { en: 'Reconstruction', fa: 'بازسازی' }, value: { en: 'MPR, MIP, 2D fusion', fa: 'MPR، MIP، ادغام دوبعدی' } },
      { label: { en: 'Reporting latency', fa: 'تأخیر گزارش' }, value: { en: '< 3 s per study', fa: 'کمتر از ۳ ثانیه برای هر مطالعه' } },
    ],
    certifications: {
      en: ['IEC 62304 software lifecycle', 'DICOM conformance statement', 'ISO 13485 aligned processes'],
      fa: ['چرخهٔ عمر نرم‌افزار IEC 62304', 'بیانیهٔ انطباق DICOM', 'فرآیندهای منطبق با ISO 13485'],
    },
    image: 'https://images.unsplash.com/photo-1476900543704-4312b78632f8?w=1200&q=80',
    span: 'normal',
  },
  {
    id: 'vitalstream',
    number: '03',
    type: 'software',
    name: { en: 'VitalStream', fa: 'وایتال‌استریم' },
    category: { en: 'Patient Monitoring', fa: 'پایش بیمار' },
    tagline: {
      en: 'Real-time patient monitoring dashboards.',
      fa: 'داشبوردهای پایش بلادرنگ بیمار.',
    },
    description: {
      en: 'Continuous vital signs from bedside monitors aggregated into a single dashboard for intensive-care, post-operative, and ward teams. Early-warning scoring runs locally — no patient data leaves the hospital network.',
      fa: 'علائم حیاتی پیوسته از مانیتورهای بالینی، در یک داشبورد واحد برای تیم‌های مراقبت ویژه، پس از عمل و بخش جمع می‌شود. امتیازدهی هشدار زودهنگام به‌صورت محلی اجرا می‌شود — هیچ دادهٔ بیمار از شبکهٔ بیمارستان خارج نمی‌شود.',
    },
    features: {
      en: [
        'Aggregates feeds from 30+ monitor manufacturers',
        'MEWS / NEWS2 early-warning scoring on-device',
        'Configurable alert routing to phones and pagers',
      ],
      fa: [
        'تجمیع داده از بیش از ۳۰ سازندهٔ مانیتور',
        'امتیازدهی هشدار زودهنگام MEWS / NEWS2 روی دستگاه',
        'مسیریابی هشدار قابل‌پیکربندی به موبایل و پیجر',
      ],
    },
    specs: [
      { label: { en: 'Acquisition rate', fa: 'نرخ نمونه‌برداری' }, value: { en: 'Up to 500 Hz waveform', fa: 'تا ۵۰۰ هرتز موج' } },
      { label: { en: 'Scoring', fa: 'امتیازدهی' }, value: { en: 'MEWS, NEWS2, custom', fa: 'MEWS، NEWS2، سفارشی' } },
      { label: { en: 'Bed capacity', fa: 'ظرفیت تخت' }, value: { en: 'Up to 1,200 beds', fa: 'تا ۱۲۰۰ تخت' } },
      { label: { en: 'Connectivity', fa: 'اتصال' }, value: { en: 'HL7, MQTT, serial', fa: 'HL7، MQTT، سریال' } },
    ],
    certifications: {
      en: ['IEC 62304 software lifecycle', 'IEC 60601-1-8 alarm alignment', 'ISO 13485 aligned processes'],
      fa: ['چرخهٔ عمر نرم‌افزار IEC 62304', 'انطباق هشدار IEC 60601-1-8', 'فرآیندهای منطبق با ISO 13485'],
    },
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1200&q=80',
    span: 'normal',
  },
  {
    id: 'medbridge',
    number: '04',
    type: 'software',
    name: { en: 'MedBridge', fa: 'مدبریج' },
    category: { en: 'Device Integration', fa: 'یکپارچه‌سازی تجهیزات' },
    tagline: {
      en: 'Connected medical device interfaces.',
      fa: 'واسط‌های تجهیزات پزشکی متصل.',
    },
    description: {
      en: 'A device-integration layer that brings infusion pumps, ventilators, anaesthesia machines, and laboratory analysers into your hospital information system. Vendor-neutral connectors deliver a single, schema-validated event stream.',
      fa: 'یک لایهٔ یکپارچه‌سازی تجهیزات که پمپ‌های انفوزیون، ونتیلاتورها، دستگاه‌های بیهوشی و آنالایزرهای آزمایشگاهی را به سامانهٔ اطلاعات بیمارستانی شما متصل می‌کند. کانکتورهای مستقل از سازنده، یک جریان رویدادِ یکپارچه و اعتبارسنجی‌شده ارائه می‌دهند.',
    },
    features: {
      en: [
        'Vendor-neutral drivers for 120+ device models',
        'Unified event schema (HL7 v2 / FHIR / MQTT)',
        'Offline buffering with guaranteed delivery',
      ],
      fa: [
        'درایورهای مستقل از سازنده برای بیش از ۱۲۰ مدل دستگاه',
        'اسکیمای رویدادِ یکپارچه (HL7 v2 / FHIR / MQTT)',
        'بافرینگ آفلاین با تضمین تحویل',
      ],
    },
    specs: [
      { label: { en: 'Supported devices', fa: 'دستگاه‌های پشتیبانی‌شده' }, value: { en: '120+ models', fa: 'بیش از ۱۲۰ مدل' } },
      { label: { en: 'Protocols', fa: 'پروتکل‌ها' }, value: { en: 'HL7, FHIR, MQTT, serial', fa: 'HL7، FHIR، MQTT، سریال' } },
      { label: { en: 'Throughput', fa: 'توان عملیاتی' }, value: { en: '10,000 events / s', fa: '۱۰٬۰۰۰ رویداد بر ثانیه' } },
      { label: { en: 'Buffering', fa: 'بافرینگ' }, value: { en: 'Local store-and-forward', fa: 'ذخیره و ارسال محلی' } },
    ],
    certifications: {
      en: ['IEC 62304 software lifecycle', 'IEC 60601-1 interface alignment', 'ISO/IEC 27001 information security'],
      fa: ['چرخهٔ عمر نرم‌افزار IEC 62304', 'انطباق واسط IEC 60601-1', 'امنیت اطلاعات ISO/IEC 27001'],
    },
    image: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=1200&q=80',
    span: 'normal',
  },
  {
    id: 'neuropulse',
    number: '05',
    type: 'equipment',
    flagship: true,
    name: { en: 'NeuroPulse', fa: 'نوروپالس' },
    category: { en: 'Innovative Technology', fa: 'فناوری نوآورانه' },
    tagline: {
      en: 'Non-invasive neuromodulation system.',
      fa: 'سامانهٔ نورومدولاسیون غیرتهاجمی.',
    },
    description: {
      en: 'A novel non-invasive neuromodulation platform, developed and supported by Pezeshk Afzar. NeuroPulse delivers precisely targeted transcranial stimulation for neurology and rehabilitation departments, with closed-loop EEG guidance and a fully documented clinical protocol library.',
      fa: 'یک سکوی نورومدولاسیون غیرتهاجمی نوآورانه که توسط پزشک‌افزار توسعه و پشتیبانی می‌شود. نوروپالس تحریک ترانس‌کرانیال هدفمند را برای بخش‌های نورولوژی و توان‌بخشی فراهم می‌کند، همراه با هدایت حلقه‌بستهٔ EEG و کتابخانهٔ کامل پروتکل‌های بالینی مستند.',
    },
    features: {
      en: [
        'Closed-loop EEG-guided transcranial stimulation',
        'Validated clinical protocol library for neuro-rehabilitation',
        'Full calibration, training, and clinical service support',
      ],
      fa: [
        'تحریک ترانس‌کرانیال با هدایت حلقه‌بستهٔ EEG',
        'کتابخانهٔ پروتکل بالینی معتبر برای توان‌بخشی عصبی',
        'کالیبراسیون کامل، آموزش و خدمات بالینی',
      ],
    },
    specs: [
      { label: { en: 'Modality', fa: 'روش' }, value: { en: 'Non-invasive tES / tDCS', fa: 'tES / tDCS غیرتهاجمی' } },
      { label: { en: 'Channels', fa: 'کانال‌ها' }, value: { en: '32-channel EEG closed loop', fa: 'حلقهٔ بستهٔ EEG با ۳۲ کانال' } },
      { label: { en: 'Output range', fa: 'محدودهٔ خروجی' }, value: { en: '0.5 – 4 mA, regulated', fa: '۰٫۵ تا ۴ میلی‌آمپر، تنظیم‌شده' } },
      { label: { en: 'Power', fa: 'تغذیه' }, value: { en: 'Medical-grade isolated supply', fa: 'منبع ایزولهٔ پزشکی' } },
    ],
    certifications: {
      en: ['CE Medical Device (MDR)', 'IEC 60601-1 / 60601-2 electrical safety', 'Medical device registration (IMED)'],
      fa: ['تجهیز پزشکی CE (MDR)', 'ایمنی الکتریکی IEC 60601-1 / 60601-2', 'ثبت تجهیز پزشکی (اداره کل تجهیزات پزشکی)'],
    },
    image: 'https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?w=1200&q=80',
    span: 'normal',
  },
  {
    id: 'oxicore',
    number: '06',
    type: 'equipment',
    name: { en: 'OxiCore', fa: 'اکسی‌کور' },
    category: { en: 'Innovative Technology', fa: 'فناوری نوآورانه' },
    tagline: {
      en: 'High-flow respiratory support unit.',
      fa: 'دستگاه پشتیبانی تنفسی پرجریان.',
    },
    description: {
      en: 'A compact high-flow oxygen therapy unit for intensive-care and emergency departments. OxiCore combines integrated humidification, adaptive flow control, and direct telemetry into the VitalStream monitoring platform.',
      fa: 'یک دستگاه فشردهٔ اکسیژن‌درمانی پرجریان برای بخش‌های مراقبت ویژه و اورژانس. اکسی‌کور مرطوب‌سازی یکپارچه، کنترل تطبیقی جریان و ارسال مستقیم داده به سکوی پایش وایتال‌استریم را یک‌جا فراهم می‌کند.',
    },
    features: {
      en: [
        'Adaptive high-flow delivery up to 60 L/min',
        'Integrated active humidification',
        'Direct telemetry into VitalStream dashboards',
      ],
      fa: [
        'تحویل تطبیقی پرجریان تا ۶۰ لیتر در دقیقه',
        'مرطوب‌سازی فعال یکپارچه',
        'ارسال مستقیم داده به داشبوردهای وایتال‌استریم',
      ],
    },
    specs: [
      { label: { en: 'Flow range', fa: 'محدودهٔ جریان' }, value: { en: '2 – 60 L/min', fa: '۲ تا ۶۰ لیتر در دقیقه' } },
      { label: { en: 'FiO₂', fa: 'کسر اکسیژن دمی' }, value: { en: '21 – 100 %', fa: '۲۱ تا ۱۰۰ درصد' } },
      { label: { en: 'Humidification', fa: 'مرطوب‌سازی' }, value: { en: '31 – 37 °C, integrated', fa: '۳۱ تا ۳۷ درجه، یکپارچه' } },
      { label: { en: 'Telemetry', fa: 'ارسال داده' }, value: { en: 'HL7 to VitalStream', fa: 'HL7 به وایتال‌استریم' } },
    ],
    certifications: {
      en: ['CE Medical Device (MDR)', 'IEC 60601-1 electrical safety', 'Medical device registration (IMED)'],
      fa: ['تجهیز پزشکی CE (MDR)', 'ایمنی الکتریکی IEC 60601-1', 'ثبت تجهیز پزشکی (اداره کل تجهیزات پزشکی)'],
    },
    image: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1200&q=80',
    span: 'normal',
  },
  {
    id: 'flowmd',
    number: '07',
    type: 'software',
    name: { en: 'FlowMD', fa: 'فلو‌ام‌دی' },
    category: { en: 'Workflow Automation', fa: 'اتوماسیون فرآیند بالینی' },
    tagline: {
      en: 'Clinical workflow automation.',
      fa: 'اتوماسیون فرآیندهای بالینی.',
    },
    description: {
      en: 'A workflow engine that automates the repetitive coordination between departments — referrals, operating-room scheduling, and discharge readiness — so clinical staff spend their time on patients rather than paperwork.',
      fa: 'یک موتور گردش‌کار که هماهنگی‌های تکراری بین بخش‌ها را خودکار می‌کند — ارجاع‌ها، زمان‌بندی اتاق عمل و آمادگی ترخیص — تا کادر بالینی وقت خود را صرف بیمار کنند، نه کاغذبازی.',
    },
    features: {
      en: [
        'Visual workflow builder for non-developers',
        'Real-time operating-room scheduling with conflict detection',
        'Discharge-readiness checklists with full audit log',
      ],
      fa: [
        'سازندهٔ بصری گردش‌کار برای افراد غیرفنی',
        'زمان‌بندی بلادرنگ اتاق عمل با تشخیص تعارض',
        'چک‌لیست آمادگی ترخیص با لاگ کامل ممیزی',
      ],
    },
    specs: [
      { label: { en: 'Workflow model', fa: 'مدل گردش‌کار' }, value: { en: 'BPMN 2.0', fa: 'BPMN 2.0' } },
      { label: { en: 'Triggers', fa: 'محرک‌ها' }, value: { en: 'HL7, FHIR, manual', fa: 'HL7، FHIR، دستی' } },
      { label: { en: 'Audit', fa: 'ممیزی' }, value: { en: 'Immutable event log', fa: 'لاگ رویداد تغییرناپذیر' } },
      { label: { en: 'Deployment', fa: 'استقرار' }, value: { en: 'On-premise or private cloud', fa: 'درون‌سازمانی یا ابر خصوصی' } },
    ],
    certifications: {
      en: ['IEC 62304 software lifecycle', 'ISO 13485 aligned processes', 'ISO/IEC 27001 information security'],
      fa: ['چرخهٔ عمر نرم‌افزار IEC 62304', 'فرآیندهای منطبق با ISO 13485', 'امنیت اطلاعات ISO/IEC 27001'],
    },
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&q=80',
    span: 'normal',
  },
]

export function getProductById(id) {
  return products.find((p) => p.id === id) ?? null
}
