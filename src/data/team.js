// ── Team roster (static) ───────────────────────────────────────────
// Each member: name · position · education · group. Persian is
// authoritative; English is a transliteration/translation. Missing
// fields are left empty and the About page renders around them.
//
//   group   'executive' | 'research' | 'engineering'
//           — drives the grouped layout on the About page.
const teamPhotos = {
  t01: '/images/team/Eng. Zirouhi.png',
  t03: '/images/team/Dr. Raei.png',
  t04: '/images/team/Dr. Meybodi.png',
  t05: '/images/team/Eng. Karbozorg.png',
  t07: '/images/team/Eng. Ghasemi.png',
  t10: '/images/team/Eng. Mokhtarzadeh.png',
}

export const team = [
  { id: 't01', group: 'executive', name: { en: 'Eng. Zirouhi', fa: 'مهندس زیروحی' }, position: { en: 'Chief Executive Officer', fa: 'مدیرعامل' }, education: { en: 'B.Sc. Electronics Engineering', fa: 'کارشناسی الکترونیک' } },
  { id: 't02', group: 'executive', name: { en: 'Eng. Shafiei', fa: 'مهندس شفیعی' }, position: { en: 'Technical Director', fa: 'مدیر فنی' }, education: { en: 'B.Sc. Software Engineering', fa: 'کارشناسی نرم‌افزار' } },
  { id: 't03', group: 'executive', name: { en: 'Dr. Raee', fa: 'دکتر راعی' }, position: { en: 'Operations Director', fa: 'مدیر داخلی' }, education: { en: 'Ph.D. Biomedical Engineering', fa: 'دکترای مهندسی پزشکی' } },
  { id: 't04', group: 'executive', name: { en: 'Dr. Meybodi', fa: 'دکتر میبودی' }, position: { en: 'Human Resources', fa: 'منابع انسانی' }, education: { en: 'Ph.D. Business Management', fa: 'دکترای مدیریت بازرگانی' } },
  { id: 't05', group: 'executive', name: { en: 'Eng. Karbozorg', fa: 'مهندس کاربزرگ' }, position: { en: 'Business Director', fa: 'مدیر کسب‌وکار' }, education: { en: 'B.Sc. in Entrepreneurship', fa: 'کارشناسی کارآفرینی' } },
  { id: 't06', group: 'research', name: { en: 'Dr. Mokhtarzadeh', fa: 'دکتر مختارزاده' }, position: { en: 'R&D Director', fa: 'مدیر تحقیق و توسعه' }, education: { en: 'Ph.D. Informatics', fa: 'دکترای انفورماتیک' } },
  { id: 't07', group: 'research', name: { en: 'Eng. Ghasemi', fa: 'مهندس قاسمی' }, position: { en: 'AI Director', fa: 'مدیر هوش مصنوعی' }, education: { en: 'M.Sc. Artificial Intelligence', fa: 'کارشناسی ارشد هوش مصنوعی' } },
  { id: 't10', group: 'research', name: { en: 'Eng. Kashani', fa: 'مهندس کاشانی' }, position: { en: 'Electronics R&D', fa: 'واحد تحقیق و توسعهٔ الکترونیک' }, education: { en: 'B.Sc. Electronics Engineering', fa: 'کارشناسی الکترونیک' } },
  { id: 't08', group: 'engineering', name: { en: 'Eng. Rezaeifar', fa: 'مهندس رضائی‌فر' }, position: { en: 'Software Developer', fa: 'کارشناس توسعهٔ نرم‌افزار' }, education: { en: 'B.Sc. Software Engineering', fa: 'کارشناسی نرم‌افزار' } },
  { id: 't09', group: 'engineering', name: { en: 'Eng. Gholami', fa: 'مهندس غلامی' }, position: { en: 'Mobile Developer', fa: 'کارشناس توسعهٔ موبایل' }, education: { en: 'B.Sc. Software Engineering', fa: 'کارشناسی نرم‌افزار' } },
  { id: 't11', group: 'engineering', name: { en: 'Eng. Mokhtarzadeh', fa: 'مهندس مختارزاده' }, position: { en: 'Industrial Engineering', fa: 'مهندسی صنایع' }, education: { en: 'B.Sc. Industrial Engineering', fa: 'کارشناسی صنایع' } },
].map((member) => (
  teamPhotos[member.id]
    ? { ...member, image: teamPhotos[member.id] }
    : member
))

// Display order for the grouped About-page layout.
export const teamGroups = ['executive', 'research', 'engineering']
