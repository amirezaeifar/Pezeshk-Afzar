export const products = [
  {
    id: 'surgitrack',
    number: '01',
    flagship: true,
    name: { en: 'SurgiTrack', fa: 'سرجی‌ترک' },
    category: { en: 'Surgical Operations', fa: 'عملیات جراحی' },
    tagline: {
      en: 'Real-time surgical instrument tracking.',
      fa: 'ردیابی بلادرنگ ابزار جراحی.',
    },
    description: {
      en: 'A computer-vision system that tracks every surgical instrument on the field in real time, using Basler Pro 2 industrial cameras and on-device inference. Prevents retained items, accelerates counts, and produces a verified audit trail for each procedure.',
      fa: 'سامانهٔ بینایی ماشین که هر ابزار جراحی روی میز را به‌صورت بلادرنگ ردیابی می‌کند، با استفاده از دوربین‌های صنعتی Basler Pro 2 و پردازش روی دستگاه. مانع جا ماندن ابزار می‌شود، شمارش را تسریع می‌کند و برای هر عمل، رد ممیزی تأیید‌شده تولید می‌کند.',
    },
    features: {
      en: [
        'Basler Pro 2 camera integration with edge inference',
        'Detection accuracy of 99.7% across 240+ instrument classes',
        'Automated count reconciliation & retained-item alerts',
      ],
      fa: [
        'یکپارچگی با دوربین Basler Pro 2 و پردازش لبه‌ای',
        'دقت تشخیص ۹۹٫۷٪ روی بیش از ۲۴۰ کلاس ابزار',
        'تطبیق خودکار شمارش و هشدار جا‌ماندن ابزار',
      ],
    },
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=1200&q=80',
    span: 'wide',
  },
  {
    id: 'clinicos',
    number: '02',
    name: { en: 'ClinicOS', fa: 'کلینیک‌اواس' },
    category: { en: 'Hospital Operations', fa: 'عملیات بیمارستانی' },
    tagline: {
      en: 'Hospital management & patient records.',
      fa: 'مدیریت بیمارستان و سوابق بیماران.',
    },
    description: {
      en: 'A modern HIS replacing fragmented spreadsheets and legacy systems. Unifies patient records, admissions, billing, and inter-department workflows into a single, role-aware interface.',
      fa: 'یک HIS مدرن که جایگزین صفحه‌گسترده‌های پراکنده و سیستم‌های قدیمی می‌شود. سوابق بیمار، پذیرش، صورتحساب و گردش‌کار بین‌بخشی را در یک واسط واحد و مبتنی بر نقش متحد می‌کند.',
    },
    features: {
      en: [
        'Unified patient records with full audit history',
        'Role-based access for clinical, admin & billing staff',
        'HL7 / FHIR APIs for HIS & lab integrations',
      ],
      fa: [
        'پروندهٔ یکپارچهٔ بیمار با تاریخچهٔ کامل ممیزی',
        'دسترسی مبتنی بر نقش برای کادر بالینی، اداری و صورتحساب',
        'APIهای HL7 / FHIR برای اتصال به HIS و آزمایشگاه',
      ],
    },
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80',
    span: 'normal',
  },
  {
    id: 'radiantimage',
    number: '03',
    name: { en: 'RadiantImage', fa: 'رادیانت‌ایمیج' },
    category: { en: 'Medical Imaging', fa: 'تصویربرداری پزشکی' },
    tagline: {
      en: 'Imaging & diagnostic assistance.',
      fa: 'تصویربرداری و کمک تشخیصی.',
    },
    description: {
      en: 'A DICOM-native viewer with diagnostic-assist models for chest X-ray, CT, and MRI. Designed for radiologists who want pre-reads, not replacement — every model output is auditable and dismissible.',
      fa: 'یک نمایشگر بومی DICOM با مدل‌های کمک‌تشخیصی برای رادیوگرافی قفسهٔ سینه، CT و MRI. طراحی‌شده برای رادیولوژیست‌هایی که پیش‌خوانی می‌خواهند، نه جایگزینی — خروجی هر مدل قابل ممیزی و رد است.',
    },
    features: {
      en: [
        'DICOM-native viewer with multiplanar reconstruction',
        'Pre-read models for CXR, CT chest, and MRI brain',
        'PACS integration with on-prem or cloud deployment',
      ],
      fa: [
        'نمایشگر بومی DICOM با بازسازی چندصفحه‌ای',
        'مدل‌های پیش‌خوانی برای CXR، CT قفسهٔ سینه و MRI مغز',
        'یکپارچگی با PACS، استقرار درون‌سازمانی یا ابری',
      ],
    },
    image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=1200&q=80',
    span: 'normal',
  },
  {
    id: 'vitalstream',
    number: '04',
    name: { en: 'VitalStream', fa: 'وایتال‌استریم' },
    category: { en: 'Patient Monitoring', fa: 'پایش بیمار' },
    tagline: {
      en: 'Real-time patient monitoring dashboards.',
      fa: 'داشبوردهای پایش بلادرنگ بیمار.',
    },
    description: {
      en: 'Continuous vitals from bedside monitors aggregated into a single dashboard for ICU, post-op, and ward teams. Early-warning scoring runs locally — no patient data leaves the hospital.',
      fa: 'علائم حیاتی پیوسته از مانیتورهای بالینی، در یک داشبورد واحد برای تیم‌های ICU، پس از عمل، و بخش جمع می‌شود. امتیازدهی هشدار زودهنگام به‌صورت محلی اجرا می‌شود — هیچ دادهٔ بیمار از بیمارستان خارج نمی‌شود.',
    },
    features: {
      en: [
        'Aggregates feeds from 30+ monitor brands',
        'MEWS / NEWS2 early-warning scoring on-device',
        'Configurable alert routing to phones & pagers',
      ],
      fa: [
        'تجمیع داده از بیش از ۳۰ برند مانیتور',
        'امتیازدهی هشدار زودهنگام MEWS / NEWS2 روی دستگاه',
        'مسیریابی هشدار قابل پیکربندی به موبایل و پیجر',
      ],
    },
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1200&q=80',
    span: 'normal',
  },
  {
    id: 'medbridge',
    number: '05',
    name: { en: 'MedBridge', fa: 'مدبریج' },
    category: { en: 'Device Integration', fa: 'اتصال تجهیزات' },
    tagline: {
      en: 'IoT-connected medical device interfaces.',
      fa: 'واسط‌های تجهیزات پزشکی متصل به اینترنت اشیاء.',
    },
    description: {
      en: 'A device-integration layer that brings infusion pumps, ventilators, anaesthesia machines, and lab analysers into your HIS. Vendor-neutral connectors with a unified, schema-validated event stream.',
      fa: 'یک لایهٔ یکپارچه‌سازی تجهیزات که پمپ‌های انفوزیون، ونتیلاتورها، دستگاه‌های بیهوشی و آنالایزرهای آزمایشگاهی را به HIS شما متصل می‌کند. کانکتورهای مستقل از فروشنده با جریان رویدادِ یکپارچه و اعتبارسنجی‌شده.',
    },
    features: {
      en: [
        'Vendor-neutral drivers for 120+ device models',
        'Unified event schema (HL7 v2 / FHIR / MQTT)',
        'Offline buffering & guaranteed delivery',
      ],
      fa: [
        'درایورهای مستقل از فروشنده برای ۱۲۰+ مدل دستگاه',
        'اسکیمای رویدادِ یکپارچه (HL7 v2 / FHIR / MQTT)',
        'بافرینگ آفلاین و تضمین تحویل',
      ],
    },
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1200&q=80',
    span: 'normal',
  },
  {
    id: 'flowmd',
    number: '06',
    name: { en: 'FlowMD', fa: 'فلو‌ام‌دی' },
    category: { en: 'Workflow Automation', fa: 'اتوماسیون فرآیند' },
    tagline: {
      en: 'Clinical workflow automation.',
      fa: 'اتوماسیون فرآیندهای بالینی.',
    },
    description: {
      en: 'A workflow engine that automates the repetitive coordination work between departments — referrals, OR scheduling, discharge readiness — so clinical staff spend their time on patients, not on paperwork.',
      fa: 'یک موتور گردش‌کار که هماهنگی‌های تکراری بین بخش‌ها را خودکار می‌کند — ارجاع‌ها، زمان‌بندی اتاق عمل، آمادگی ترخیص — تا کادر بالینی وقتشان را روی بیمار صرف کنند، نه روی کاغذبازی.',
    },
    features: {
      en: [
        'Visual workflow builder for non-developers',
        'Real-time OR scheduling with conflict detection',
        'Discharge-readiness checklists with audit log',
      ],
      fa: [
        'سازندهٔ بصری گردش‌کار برای افراد غیرفنی',
        'زمان‌بندی بلادرنگ اتاق عمل با تشخیص تعارض',
        'چک‌لیست آمادگی ترخیص با لاگ ممیزی',
      ],
    },
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1200&q=80',
    span: 'normal',
  },
]
