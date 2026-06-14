import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ar' | 'en' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  dir: 'rtl' | 'ltr';
  t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, any>> = {
  ar: {
    meta: {
      title: "د. عبد الناصر | العلاج الطبيعي وإعادة التأهيل",
      description: "علاج طبيعي، إعادة تأهيل، تمدد وتدليك علاجي مصمم لاستعادة حركتك وتقليل آلامك. زيارات منزلية واستشارات عبر الإنترنت في ميشيغان."
    },
    nav: {
      home: "الرئيسية",
      services: "الخدمات",
      care: "رعاية متخصصة",
      conditions: "الحالات المعالجة",
      about: "عن الدكتور",
      whyUs: "لماذا نحن",
      booking: "حجز موعد",
      contact: "اتصل بنا",
    },
    hero: {
      title1: "تخفيف الألم.",
      title2: "استعادة الحركة.",
      title3: "تحسين جودة الحياة.",
      subtitle: "علاج طبيعي وتأهيل متقدم مخصص لك. أينما كنت.",
      description: "نساعدك على التعافي من الألم والإصابات ومحدودية الحركة من خلال رعاية فردية مخصصة، وتقنيات علاجية مثبتة علمياً، ومنهج شامل لشفاء الجسم.",
      ctaBook: "حجز موعد",
      ctaConsult: "استشارة مجانية",
      features: {
        home: { title: "زيارات منزلية", desc: "في جميع أنحاء ميشيغان" },
        online: { title: "استشارات عبر الإنترنت", desc: "من أي مكان" },
        custom: { title: "رعاية مخصصة", desc: "من أجلك أنت فقط" }
      },
      experienceBadge: {
        title: "10+ سنوات",
        line1: "خبرة سريرية",
        line2: "مساعدة المرضى",
        line3: "للعيش بدون ألم"
      },
      statsBanner: {
        trusted: "موثوق من المرضى في ميشيغان",
        patientsVal: "+1,200",
        patientsDesc: "مريض تم علاجهم",
        satisfactionVal: "98%",
        satisfactionDesc: "رضا المرضى",
        expVal: "10+ سنوات",
        expDesc: "خبرة سريرية",
        visitsVal: "ميشيغان بالكامل",
        visitsDesc: "زيارات منزلية متاحة"
      }
    },
    services: {
      title: "خدماتنا العلاجية",
      subtitle: "نقدم مجموعة واسعة من الخدمات الطبية وإعادة التأهيل المصممة خصيصاً لتناسب احتياجاتك الفردية.",
      items: {
        pt: {
          title: "العلاج الطبيعي وإعادة التأهيل",
          desc: "جلسات علاجية متخصصة لاستعادة وظائف الجسم وتقوية العضلات والمفاصل بعد الإصابات والعمليات الجراحية."
        },
        stretch: {
          title: "التمدد العلاجي",
          desc: "تقنيات تمدد متقدمة لزيادة مرونة العضلات، وتحسين مدى الحركة، وتخفيف الضغط على المفاصل العمود الفقري."
        },
        massage: {
          title: "التدليك العلاجي",
          desc: "تدليك طبي يستهدف مناطق الألم والشد العضلي العميق لتحفيز تدفق الدم وتسريع عملية التعافي."
        },
        relax: {
          title: "التدليك الاسترخائي",
          desc: "جلسات تدليك مخصصة لتقليل التوتر النفسي والجسدي، وتحسين جودة النوم، وتنشيط حيوية الجسم."
        },
        lymphatic: {
          title: "تدليك التصريف اللمفاوي",
          desc: "تقنية لطيفة وفعالة لتقليل التورم والانتفاخ، والتخلص من السموم، ودعم الجهاز المناعي بعد الجراحة أو الإصابات."
        },
        sports: {
          title: "التدليك الرياضي",
          desc: "مخصص للرياضيين لزيادة المرونة، وتحسين الأداء البدني، ومنع الإصابات، وتسريع الشفاء بعد المجهود العضلي."
        },
        exercise: {
          title: "برامج التمارين التصحيحية",
          desc: "تمارين علاجية مخصصة لتصحيح الاختلالات الحركية، وتقوية العضلات الضعيفة، واستعادة التوازن الحركي."
        },
        nutrition: {
          title: "إرشادات التغذية للتعافي",
          desc: "خطط غذائية تدعم عمليات الشفاء الذاتي للجسم، وتقلل الالتهابات، وتوفر الطاقة اللازمة لإعادة التأهيل."
        },
        coaching: {
          title: "تدريب أسلوب الحياة والحركة",
          desc: "توجيه مستمر لتحسين جودة الحركة اليومية، وتعديل بيئة العمل (الأرجونوميكس)، وضمان نمط حياة صحي وخالٍ من الألم."
        }
      }
    },
    specialized: {
      title: "رعاية تخصصية مكثفة",
      subtitle: "برامج إعادة تأهيل متقدمة للمصابين في الحوادث وإصابات العمل المعقدة لاستعادة وظائفهم الحيوية بالكامل.",
      car: {
        title: "إعادة التأهيل بعد حوادث السيارات",
        subtitle: "إعادة تأهيل متخصصة لمساعدتك على التعافي من آثار الصدمات وحوادث الطرق واستعادة كامل مرونتك.",
        desc: "نحن نتفهم مدى تعقيد الإصابات الناتجة عن الحوادث ونقدم رعاية مكثفة تشمل علاج وتخفيف الأعراض التالية:",
        symptoms: [
          "إصابات الرقبة الارتدادية (Whiplash)",
          "آلام الرقبة والظهر الشديدة",
          "آلام أسفل الظهر الحادة والمزمنة",
          "صداع ما بعد الحوادث والارتجاج",
          "تيبس العضلات وصعوبة الالتفات",
          "ضعف الحركة بعد الإصابة وتصلب المفاصل",
          "ألم الصدمة وتشنج الأنسجة العميقة"
        ],
        timeline: {
          title: "رحلة التعافي بعد الحوادث",
          step1: "التقييم الشامل وتخفيف الألم الحاد",
          step2: "استعادة حركة المفاصل ومرونة الأنسجة",
          step3: "التقوية العضلية وإعادة التأهيل الوظيفي",
          step4: "برنامج الوقاية والعودة للنشاط الكامل"
        }
      },
      work: {
        title: "إعادة تأهيل إصابات العمل",
        subtitle: "التخلص من الآلام الناتجة عن المجهود البدني المتكرر أو الحوادث المهنية في بيئة العمل.",
        desc: "سواء كان عملك يتطلب مجهوداً عضلياً شاقاً أو الجلوس الطويل أمام المكاتب، نساعدك على الشفاء التام من الإصابات التالية:",
        symptoms: [
          "إصابات رفع الأوزان والأحمال الثقيلة بطرق خاطئة",
          "آلام الظهر الحادة والكتف المتصلب بسبب العمل",
          "إصابات الإجهاد المتكرر (RSI) لليدين والمعصم",
          "إجهاد العضلات والشد المزمن في الرقبة والأكتاف",
          "الآلام المزمنة المرتبطة بوضعية الجلوس أو الوقوف الطويل",
          "انخفاض القدرة على الحركة والأداء المهني بعد الإصابة"
        ],
        ergonomics: "نقدم أيضاً استشارات مجانية لتعديل وضعيات العمل المكتبي والبدني لمنع تكرار الإصابة."
      }
    },
    bodyMap: {
      title: "الحالات التي نعالجها",
      subtitle: "اضغط على الأجزاء التفاعلية من الجسم لمعرفة تفاصيل الحالات الطبية التي يتخصص الدكتور عبد الناصر في علاجها.",
      neck: "آلام الرقبة والظهر وصداع التوتر العضلي الناتج عن التشنج في الفقرات العنقية.",
      back: "آلام الظهر، عرق النسا، مشاكل القوام والفقرات، وضعف عضلات الجذع.",
      shoulder: "آلام الأطراف والذراعين، تيبس الأكتاف، والتهاب الأوتار وإصابات الإجهاد المتكرر.",
      hip: "آلام عرق النسا الممتدة، مشاكل مفصل الورك، وضعف الحوض الحركي.",
      knee: "آلام الركبة، الإصابات الرياضية وتلف الأربطة، ضعف وتيبس المفاصل السفلية.",
      ankle: "التواء الكاحل، آلام الأطراف السفلية، وضعف التوازن والقدرة على المشي المريح.",
      selectArea: "اختر منطقة من خريطة الجسم لعرض الحالات والتشخيصات المرتبطة بها.",
      generalTitle: "الحالات العامة المعالجة:",
      generalList: [
        "عرق النسا وآلام العصب الوركي",
        "الشد العضلي والتقلصات المزمنة",
        "مشاكل القوام وانحناء الظهر",
        "صداع التوتر وتشنج عضلات الرقبة",
        "التعب المزمن وانخفاض الطاقة والجهد البدني"
      ]
    },
    about: {
      title: "عن الدكتور عبد الناصر",
      subtitle: "خبرة سريرية وأكاديمية دولية مكرسة لاستعادة صحتك وحركتك الطبيعية.",
      bio: "الدكتور عبد الناصر متخصص في العلاج الطبيعي وإعادة التأهيل. تلقى تدريبه وخبرته الأكاديمية والسريرية المتقدمة في روسيا، حيث عمل بشكل مكثف مع الرياضيين المحترفين والمرضى الذين يعانون من حالات معقدة للعمود الفقري والجهاز الحركي.",
      bullets: [
        "خبرة عمل واسعة في العيادات الخاصة والمراكز الطبية المتقدمة.",
        "العمل الأكاديمي والسريري في الجامعة لتدريب وتأهيل الرياضيين من مختلف الرياضات.",
        "تخصص دقيق في إعادة تأهيل المرضى الذين يعانون من الآلام المزمنة وتقييد الحركة الشديد.",
        "التركيز على تحديد السبب الجذري للمشكلة بدلاً من علاج الأعراض المؤقتة لاستعادة الوظيفة الطبيعية بالكامل."
      ],
      philosophy: {
        title: "فلسفتنا العلاجية",
        text: "\"الحركة هي الحياة. لا ينبغي لأحد أن يقبل العيش مع الألم كأمر طبيعي. مهمتي هي إيجاد الخلل وإصلاحه لتعود لممارسة حياتك بأقصى طاقة ممكنة وبكل حرية.\""
      }
    },
    whyChooseUs: {
      title: "لماذا تختار د. عبد الناصر؟",
      subtitle: "ما يميز رعايتنا الطبية هو الدمج بين الخبرة العالمية والنهج الفردي المريح لكل مريض.",
      items: [
        {
          title: "خبرة سريرية دولية",
          desc: "تدريب وخلفية طبية متميزة في روسيا تدمج بين أحدث مدارس العلاج الطبيعي الأوروبية وإعادة التأهيل الحركي."
        },
        {
          title: "العمل في عيادة وجامعة",
          desc: "خبرة أكاديمية وعملية تضمن تطبيق أحدث الأبحاث العلمية والتمارين العلاجية المثبتة طبياً."
        },
        {
          title: "خبرة مع الرياضيين",
          desc: "فهم عميق للميكانيكا الحيوية للجسم وإصابات المجهود البدني العالي، مما يضمن شفاء أسرع وأقوى."
        },
        {
          title: "نهج فردي مخصص",
          desc: "برنامج علاجي مفصل بنسبة 100% لكل مريض بناءً على حالته الصحية، وتاريخه الطبي وأهدافه الشخصية."
        },
        {
          title: "إعادة تأهيل شامل للجسم",
          desc: "لا نركز على موضع الألم فقط، بل نحلل حركة الجسم بالكامل لمعالجة الاختلالات الهيكلية والعضلية."
        },
        {
          title: "زيارات منزلية مريحة",
          desc: "نأتي إليك بمعداتنا العلاجية في أي مكان في ميشيغان لضمان راحتك التامة وخصوصيتك."
        },
        {
          title: "استشارات عبر الإنترنت",
          desc: "جلسات استشارية ومتابعة مرئية متقدمة عبر الإنترنت لتوجيهك في تمارينك أينما كنت."
        }
      ]
    },
    serviceArea: {
      title: "منطقة الخدمة والزيارات",
      subtitle: "نخدم العملاء في جميع أنحاء ولاية ميشيغان من خلال خدماتنا المرنة.",
      homeVisits: {
        title: "الزيارات المنزلية",
        desc: "نغطي معظم مدن ومناطق ولاية ميشيغان. يأتي الدكتور عبد الناصر مباشرة إلى منزلك أو مكتبك مجهزاً بجميع الأدوات العلاجية اللازمة للتعافي."
      },
      onlineConsult: {
        title: "الاستشارات عبر الإنترنت",
        desc: "جلسات تشخيص وتدريب وتصميم برامج التمارين المنزلية بالفيديو، متاحة لجميع المرضى في جميع الولايات والمدن مع متابعة مستمرة."
      },
      michiganNote: "نخدم ولاية ميشيغان بشكل رئيسي في الزيارات المنزلية (شاملة ديترويت، ديربورن، آن أربور، والمناطق المجاورة)."
    },
    testimonials: {
      title: "قصص نجاح وتعافي",
      subtitle: "آراء عملائنا الذين استعادوا حركتهم وتخلصوا من آلامهم بفضل البرامج المخصصة.",
      list: [
        {
          name: "أحمد المريسي",
          role: "إعادة تأهيل بعد حادث سيارة",
          text: "تعرضت لحادث سير أليم وأصبت بالتواء شديد في الرقبة وآلام أسفل الظهر. بفضل الزيارات المنزلية والبرنامج الدقيق للدكتور عبد الناصر، استعدت حركتي بالكامل وتخلصت من الصداع المزعج في غضون أسابيع قليلة. أنصح به بشدة!"
        },
        {
          name: "سارة ديفيس",
          role: "إصابة عمل ومكتب",
          text: "أعمل لساعات طويلة أمام الحاسوب وكنت أعاني من شد عضلي مزمن في الأكتاف وتنميل بالذراع. غيرت الجلسات العلاجية وتعديلات وضعية العمل حياتي اليومية. لم أعد أشعر بالألم أثناء العمل."
        },
        {
          name: "جون كوبر",
          role: "رياضي - لاعب كرة قدم",
          text: "أصبت بتمزق عضلي في الفخذ خلال إحدى المباريات. علاج الدكتور عبد الناصر وتوجيهاته الغذائية والتمارين التصحيحية ساعدتني على العودة للملعب بشكل أسرع مما توقعت وبلياقة كاملة."
        }
      ]
    },
    faq: {
      title: "الأسئلة الشائعة",
      subtitle: "إجابات لجميع استفساراتك حول الجلسات والزيارات والبرامج العلاجية.",
      items: [
        {
          q: "ما هي المناطق التي تغطيها الزيارات المنزلية؟",
          a: "نغطي معظم أنحاء ولاية ميشيغان، بما في ذلك منطقة مترو ديترويت، ديربورن، كانتون، آن أربور، والمناطق المجاورة. يرجى الاتصال بنا لتأكيد توفر الخدمة في موقعك المحدد."
        },
        {
          q: "كيف تتم الاستشارة عبر الإنترنت؟",
          a: "تتم الاستشارة عبر مكالمة فيديو مشفرة وآمنة. يقوم الدكتور بتقييم حركتك، واختبار مرونتك، ثم تصميم برنامج تمارين علاجية مخصص وتدريبك على أدائه بشكل صحيح مع تزويدك بدليل تمارين مصور."
        },
        {
          q: "ما هي مدة الجلسة العلاجية؟",
          a: "تستغرق الجلسة الأولى للتقييم حوالي 60 إلى 75 دقيقة لتحديد التشخيص ووضع الخطة. الجلسات اللاحقة تتراوح مدتها بين 45 إلى 60 دقيقة من العلاج اليدوي والتمارين المكثفة."
        },
        {
          q: "هل أحتاج إلى إحالة طبية من طبيب آخر؟",
          a: "لا، لا تحتاج إلى إحالة طبية لبدء العلاج معنا. يمكنك حجز موعدك مباشرة وبدء التقييم والتعافي على الفور."
        },
        {
          q: "كيف يمكنني الدفع مقابل الجلسات؟",
          a: "نقبل الدفع ببطاقات الائتمان، المدفوعات الإلكترونية، والنقد. كما نوفر فواتير مفصلة يمكنك تقديمها لشركات التأمين للحصول على تعويض (إرجاع نقدي) حسب بوليصة التأمين الخاصة بك."
        }
      ]
    },
    bookingForm: {
      title: "ابدأ رحلة التعافي اليوم",
      subtitle: "املأ النموذج أدناه لحجز موعدك. سيقوم النظام بصياغة تفاصيل حجزك وإرسالها مباشرة إلى واتساب الدكتور عبد الناصر لتأكيد الموعد فوراً.",
      nameLabel: "الاسم الكامل",
      namePlaceholder: "أدخل اسمك الكريم",
      phoneLabel: "رقم الهاتف",
      phonePlaceholder: "+1 (313) 000-0000",
      serviceLabel: "الخدمة المطلوبة",
      servicePlaceholder: "اختر الخدمة الرئيسية",
      consultLabel: "نوع الاستشارة",
      consultOptions: {
        home: "زيارة منزلية (داخل ميشيغان)",
        online: "استشارة مرئية عبر الإنترنت"
      },
      dateLabel: "التاريخ المفترض",
      timeLabel: "الوقت المفضل",
      timePlaceholder: "مثال: 10:00 صباحاً",
      notesLabel: "ملاحظات إضافية أو وصف للألم",
      notesPlaceholder: "اكتب هنا أي تفاصيل تود إطلاع الدكتور عليها قبل الجلسة...",
      submitButton: "إرسال الحجز عبر واتساب 💬",
      successMsg: "جاري فتح واتساب لإرسال حجزك...",
      whatsappTemplate: "مرحباً دكتور عبد الناصر، أود حجز موعد للعلاج الطبيعي:\n\n*الاسم:* {name}\n*الهاتف:* {phone}\n*الخدمة:* {service}\n*النوع:* {type}\n*التاريخ:* {date}\n*الوقت:* {time}\n*ملاحظات:* {notes}\n\nيرجى تأكيد الحجز الموعد وشكراً لكم."
    },
    footer: {
      rights: "جميع الحقوق محفوظة © 2026 د. عبد الناصر. تم التصميم والبرمجة بأعلى المعايير الطبية.",
      tagline: "تخفيف الألم. استعادة الحركة. تحسين جودة الحياة.",
      contactInfo: "معلومات الاتصال",
      quickLinks: "روابط سريعة"
    }
  },
  en: {
    meta: {
      title: "Dr. Abdul Nasser | Physical Therapy & Rehabilitation",
      description: "Specialized physical therapy, rehabilitation, therapeutic stretching, and massage designed to reduce pain, restore movement, and improve quality of life in Michigan."
    },
    nav: {
      home: "Home",
      services: "Services",
      care: "Specialized",
      conditions: "Conditions",
      about: "About",
      whyUs: "Why Us",
      booking: "Book Now",
      contact: "Contact",
    },
    hero: {
      title1: "Relieve Pain.",
      title2: "Restore Movement.",
      title3: "Improve Quality of Life.",
      subtitle: "Advanced Physical Therapy & Rehabilitation Tailored to You. Wherever You Are.",
      description: "We help you recover from pain, injuries, and movement limitations with personalized care, proven techniques, and a whole-body approach to healing.",
      ctaBook: "Book Appointment",
      ctaConsult: "Free Consultation",
      features: {
        home: { title: "Home Visits", desc: "Across Michigan" },
        online: { title: "Online Consultations", desc: "From Anywhere" },
        custom: { title: "Personalized Care", desc: "Just for You" }
      },
      experienceBadge: {
        title: "10+ Years",
        line1: "Clinical Experience",
        line2: "Helping Patients",
        line3: "Move Better & Live Pain-Free"
      },
      statsBanner: {
        trusted: "Trusted by Patients Across Michigan",
        patientsVal: "1,200+",
        patientsDesc: "Patients Treated",
        satisfactionVal: "98%",
        satisfactionDesc: "Patient Satisfaction",
        expVal: "10+",
        expDesc: "Years Experience",
        visitsVal: "All Michigan",
        visitsDesc: "Home Visits Available"
      }
    },
    services: {
      title: "Our Therapeutic Services",
      subtitle: "We offer a wide range of medical and rehabilitation services customized to suit your individual needs.",
      items: {
        pt: {
          title: "Physical Therapy & Rehabilitation",
          desc: "Specialized therapeutic sessions to restore body functions and strengthen muscles and joints after injuries and surgeries."
        },
        stretch: {
          title: "Therapeutic Stretching",
          desc: "Advanced stretching techniques to increase muscle flexibility, improve range of motion, and relieve pressure on spinal joints."
        },
        massage: {
          title: "Therapeutic Massage",
          desc: "Medical massage targeting areas of deep pain and muscle tightness to stimulate blood flow and speed up recovery."
        },
        relax: {
          title: "Relaxation Massage",
          desc: "Customized massage sessions to reduce mental and physical stress, improve sleep quality, and restore body vitality."
        },
        lymphatic: {
          title: "Lymphatic Drainage Massage",
          desc: "A gentle and effective technique to reduce swelling, eliminate toxins, and support the immune system after surgery or injuries."
        },
        sports: {
          title: "Sports Massage",
          desc: "Designed for athletes to increase flexibility, improve physical performance, prevent injuries, and accelerate recovery after intense exertion."
        },
        exercise: {
          title: "Corrective Exercise Programs",
          desc: "Customized therapeutic exercises to correct movement imbalances, strengthen weak muscles, and restore kinetic balance."
        },
        nutrition: {
          title: "Recovery Nutrition Guidance",
          desc: "Dietary plans that support the body's natural healing processes, reduce inflammation, and provide the energy needed for rehab."
        },
        coaching: {
          title: "Movement & Lifestyle Coaching",
          desc: "Continuous guidance to improve daily movement quality, adjust the workspace (ergonomics), and ensure a healthy, pain-free lifestyle."
        }
      }
    },
    specialized: {
      title: "Specialized Care Programs",
      subtitle: "Advanced rehabilitation programs for accident victims and complex work-related injuries to fully restore vital functions.",
      car: {
        title: "Auto Accident Rehabilitation",
        subtitle: "Specialized rehabilitation to help you recover from collision trauma and road accidents, restoring full mobility.",
        desc: "We understand the complexity of injuries resulting from accidents and offer intensive care that includes treating and relieving:",
        symptoms: [
          "Whiplash & Neck Injuries",
          "Severe Neck and Back Pain",
          "Acute & Chronic Lower Back Pain",
          "Post-Accident Headaches & Concussions",
          "Muscle Stiffness and Difficulty Turning",
          "Limited Mobility & Joint Stiffness After Injury",
          "Post-Traumatic Pain & Deep Tissue Spasms"
        ],
        timeline: {
          title: "Post-Accident Recovery Journey",
          step1: "Comprehensive assessment & acute pain relief",
          step2: "Restoring joint mobility & tissue flexibility",
          step3: "Muscle strengthening & functional rehabilitation",
          step4: "Prevention program & return to full activities"
        }
      },
      work: {
        title: "Work Injury Rehabilitation",
        subtitle: "Relieving pain caused by repetitive physical strain or occupational accidents in the workplace.",
        desc: "Whether your job requires heavy physical labor or long hours of desk sitting, we help you fully recover from the following:",
        symptoms: [
          "Lifting Injuries & Incorrect Load Handling",
          "Acute Back Pain & Stiff Shoulder due to Work Strain",
          "Repetitive Stress Injuries (RSI) for Hands & Wrists",
          "Muscle Strain & Chronic Tension in Neck & Shoulders",
          "Chronic Pain Associated with Long Sitting or Standing",
          "Reduced Mobility and Professional Performance After Injury"
        ],
        ergonomics: "We also offer ergonomic consultations to adjust office and physical work setups to prevent re-injury."
      }
    },
    bodyMap: {
      title: "Conditions We Treat",
      subtitle: "Click on the interactive body parts to learn details about the conditions Dr. Abdul Nasser specializes in treating.",
      neck: "Neck pain, back pain, and tension headaches caused by spasm in the cervical spine.",
      back: "Lower back pain, sciatica, posture & disc problems, and core muscle weakness.",
      shoulder: "Limb & arm pain, stiff shoulders, tendinitis, and repetitive stress injuries.",
      hip: "Radiating sciatica pain, hip joint issues, and pelvic kinetic weakness.",
      knee: "Knee pain, sports injuries & ligament damage, and lower joint stiffness.",
      ankle: "Ankle sprains, lower limb pain, balance weakness, and difficulty walking comfortably.",
      selectArea: "Select an area on the body map to view related conditions and diagnoses.",
      generalTitle: "General Conditions Treated:",
      generalList: [
        "Sciatica & sciatic nerve pain",
        "Chronic muscle tightness & spasms",
        "Posture problems & spinal alignment",
        "Tension headaches & neck tightness",
        "Chronic fatigue & reduced physical energy"
      ]
    },
    about: {
      title: "About Dr. Abdul Nasser",
      subtitle: "International clinical and academic experience dedicated to restoring your health and natural movement.",
      bio: "Dr. Abdul Nasser is a physical therapy and rehabilitation specialist. He received his advanced academic and clinical training in Russia, where he worked extensively with professional athletes and patients suffering from complex spine and musculoskeletal conditions.",
      bullets: [
        "Extensive work experience in private clinics and advanced medical centers.",
        "Academic and clinical work in the university training and rehabilitating athletes of various sports.",
        "Specific specialization in rehabilitating patients with chronic pain and severe mobility restrictions.",
        "Focus on identifying the root cause of the problem rather than treating temporary symptoms to fully restore normal function."
      ],
      philosophy: {
        title: "Treatment Philosophy",
        text: "\"Movement is life. No one should accept living with pain as normal. My mission is to identify the imbalance and fix it so you can return to living your life with maximum energy and freedom.\""
      }
    },
    whyChooseUs: {
      title: "Why Choose Dr. Abdul Nasser?",
      subtitle: "What sets our medical care apart is the combination of international experience and a comfortable, individualized approach for each patient.",
      items: [
        {
          title: "International Clinical Experience",
          desc: "Excellent training and medical background in Russia, integrating the latest European schools of physical therapy and motor rehabilitation."
        },
        {
          title: "University & Clinic Work",
          desc: "Both academic and practical experience, ensuring the application of the latest medical research and clinically proven exercises."
        },
        {
          title: "Expertise with Athletes",
          desc: "Deep understanding of body biomechanics and high-exertion physical injuries, ensuring faster and stronger recovery."
        },
        {
          title: "Personalized Approach",
          desc: "100% customized treatment program for each patient based on their health status, medical history, and personal goals."
        },
        {
          title: "Whole-Body Rehabilitation",
          desc: "We don't just focus on the site of pain; we analyze whole-body movement to address structural and muscular imbalances."
        },
        {
          title: "Convenient Home Visits",
          desc: "We come to you with our therapeutic equipment anywhere in Michigan to ensure your comfort and privacy."
        },
        {
          title: "Online Consultations",
          desc: "Advanced video consultation and follow-up sessions to guide your exercises wherever you are."
        }
      ]
    },
    serviceArea: {
      title: "Service Area & Visits",
      subtitle: "We serve clients across the state of Michigan through our flexible services.",
      homeVisits: {
        title: "Home Visits",
        desc: "We cover most cities and regions of Michigan. Dr. Abdul Nasser comes directly to your home or office equipped with all the recovery tools needed."
      },
      onlineConsult: {
        title: "Online Consultations",
        desc: "Diagnosis, coaching, and custom home exercise video programs, available to patients nationwide with continuous follow-up."
      },
      michiganNote: "Mainly serving Michigan for home visits (including Detroit, Dearborn, Ann Arbor, and surrounding areas)."
    },
    testimonials: {
      title: "Success & Recovery Stories",
      subtitle: "Hear from our clients who restored their movement and eliminated their pain through custom programs.",
      list: [
        {
          name: "Ahmed Al-Muraisi",
          role: "Car Accident Rehabilitation",
          text: "I had a terrible car accident, suffering severe whiplash and lower back pain. Thanks to the home visits and Dr. Abdul Nasser's precise program, I fully recovered my mobility and headaches disappeared within weeks. Highly recommended!"
        },
        {
          name: "Sarah Davis",
          role: "Desk Job Work Strain",
          text: "Working long hours at a computer left me with chronic neck tightness and arm numbness. The therapy sessions and ergonomic adjustments changed my daily life. I no longer feel pain while working."
        },
        {
          name: "John Cooper",
          role: "Athlete - Soccer Player",
          text: "I suffered a hamstring tear during a match. Dr. Abdul Nasser's treatment, recovery nutrition, and corrective exercises got me back on the pitch faster than expected and in top form."
        }
      ]
    },
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Answers to your common questions about therapy sessions, home visits, and programs.",
      items: [
        {
          q: "What areas do home visits cover?",
          a: "We cover most parts of Michigan, including Metro Detroit, Dearborn, Canton, Ann Arbor, and surrounding areas. Please contact us to confirm availability at your specific location."
        },
        {
          q: "How does an online consultation work?",
          a: "Online consultations take place via secure video call. The doctor will assess your movement, test your flexibility, design a customized exercise program, and guide you through it."
        },
        {
          q: "How long is each session?",
          a: "The initial evaluation session takes about 60 to 75 minutes. Subsequent sessions range from 45 to 60 minutes of manual therapy and targeted therapeutic exercises."
        },
        {
          q: "Do I need a doctor referral to start?",
          a: "No, you do not need a referral. You can book directly with us and start your evaluation and recovery journey immediately."
        },
        {
          q: "What payment methods are accepted?",
          a: "We accept credit cards, electronic payments, and cash. We also provide detailed superbills/invoices that you can submit to your insurance company for reimbursement."
        }
      ]
    },
    bookingForm: {
      title: "Start Your Recovery Journey Today",
      subtitle: "Fill out the form below. The system will compile your booking details and send them directly to Dr. Abdul Nasser's WhatsApp to confirm your appointment.",
      nameLabel: "Full Name",
      namePlaceholder: "Enter your name",
      phoneLabel: "Phone Number",
      phonePlaceholder: "+1 (313) 000-0000",
      serviceLabel: "Requested Service",
      servicePlaceholder: "Select a primary service",
      consultLabel: "Consultation Type",
      consultOptions: {
        home: "Home Visit (Within Michigan)",
        online: "Online Video Consultation"
      },
      dateLabel: "Preferred Date",
      timeLabel: "Preferred Time",
      timePlaceholder: "e.g., 10:00 AM",
      notesLabel: "Additional Notes / Pain Description",
      notesPlaceholder: "Write any details you'd like the doctor to know before your session...",
      submitButton: "Send Booking via WhatsApp 💬",
      successMsg: "Opening WhatsApp to send your booking...",
      whatsappTemplate: "Hello Dr. Abdul Nasser, I would like to book a physical therapy appointment:\n\n*Name:* {name}\n*Phone:* {phone}\n*Service:* {service}\n*Type:* {type}\n*Date:* {date}\n*Time:* {time}\n*Notes:* {notes}\n\nPlease confirm availability. Thank you."
    },
    footer: {
      rights: "All rights reserved © 2026 Dr. Abdul Nasser. Designed and programmed to premium medical standards.",
      tagline: "Relieve Pain. Restore Movement. Improve Quality of Life.",
      contactInfo: "Contact Info",
      quickLinks: "Quick Links"
    }
  },
  ru: {
    meta: {
      title: "Доктор Абдул Насер | Физиотерапия и Реабилитация",
      description: "Специализированная физиотерапия, реабилитация, лечебная растяжка и массаж, направленные на уменьшение боли и восстановление подвижности в Мичигане."
    },
    nav: {
      home: "Главная",
      services: "Услуги",
      care: "Реабилитация",
      conditions: "Показания",
      about: "О докторе",
      whyUs: "Почему мы",
      booking: "Записаться",
      contact: "Контакты",
    },
    hero: {
      title1: "Облегчение боли.",
      title2: "Восстановление движения.",
      title3: "Улучшение качества жизни.",
      subtitle: "Передовая физиотерапия и реабилитация, адаптированная для вас. Где бы вы ни были.",
      description: "Мы помогаем вам восстановиться после боли, травм и ограничений подвижности с помощью индивидуального подхода, проверенных методик и комплексного лечения всего тела.",
      ctaBook: "Записаться на прием",
      ctaConsult: "Бесплатная консультация",
      features: {
        home: { title: "Визиты на дом", desc: "По всему Мичигану" },
        online: { title: "Онлайн-консультации", desc: "Из любого места" },
        custom: { title: "Индивидуальный уход", desc: "Только для вас" }
      },
      experienceBadge: {
        title: "10+ лет",
        line1: "Клинический опыт",
        line2: "Помощь пациентам",
        line3: "Жизнь без боли"
      },
      statsBanner: {
        trusted: "Доверие пациентов по всему Мичигану",
        patientsVal: "1 200+",
        patientsDesc: "Пролеченных больных",
        satisfactionVal: "98%",
        satisfactionDesc: "Удовлетворенность",
        expVal: "10+ лет",
        expDesc: "Опыт работы",
        visitsVal: "Весь Мичиган",
        visitsDesc: "Доступны визиты на дом"
      }
    },
    services: {
      title: "Наши Терапевтические Услуги",
      subtitle: "Мы предлагаем широкий спектр медицинских и реабилитационных услуг, разработанных под ваши индивидуальные потребности.",
      items: {
        pt: {
          title: "Физиотерапия и Реабилитация",
          desc: "Специализированные терапевтические сеансы для восстановления функций тела, укрепления мышц и суставов после травм и операций."
        },
        stretch: {
          title: "Лечебная Растяжка",
          desc: "Передовые техники растяжки для увеличения гибкости мышц, улучшения амплитуды движений и снижения нагрузки на позвоночник."
        },
        massage: {
          title: "Лечебный Массаж",
          desc: "Медицинский массаж, направленный на триггерные зоны и глубокие мышцы для стимуляции кровообращения и ускорения заживления."
        },
        relax: {
          title: "Расслабляющий Массаж",
          desc: "Сеансы массажа для снижения физического и психологического напряжения, улучшения сна и восстановления жизненных сил."
        },
        lymphatic: {
          title: "Лимфодренажный Массаж",
          desc: "Мягкая методика для уменьшения отеков, вывода токсинов и поддержки иммунной системы после операций или травм."
        },
        sports: {
          title: "Спортивный Массаж",
          desc: "Разработан для спортсменов с целью повышения гибкости, улучшения показателей, предотвращения травм и ускорения восстановления."
        },
        exercise: {
          title: "Коррекционные Упражнения",
          desc: "Специальные упражнения для исправления двигательных дисбалансов, укрепления слабых мышц и восстановления кинетического баланса."
        },
        nutrition: {
          title: "Питание для Восстановления",
          desc: "Рекомендации по питанию, поддерживающие естественные процессы заживления, снижающие воспаления и дающие энергию."
        },
        coaching: {
          title: "Коучинг по движению и образу жизни",
          desc: "Постоянное руководство для улучшения качества повседневных движений, настройки рабочего места (эргономики) и здоровой жизни без боли."
        }
      }
    },
    specialized: {
      title: "Специализированные Программы",
      subtitle: "Программы реабилитации после ДТП и тяжелых производственных травм для полного восстановления жизненных функций.",
      car: {
        title: "Реабилитация после ДТП",
        subtitle: "Специализированная помощь в восстановлении после столкновений, аварий и дорожных происшествий.",
        desc: "Мы понимаем сложность травм после ДТП и предлагаем интенсивную терапию, направленную на лечение:",
        symptoms: [
          "Хлыстовая травма шеи (Whiplash)",
          "Сильные боли в шее и спине",
          "Острые и хронические боли в пояснице",
          "Головные боли и последствия сотрясения мозга",
          "Мышечная скованность и ограничение поворота головы",
          "Ограниченная подвижность суставов после аварии",
          "Посттравматические мышечные спазмы глубоких тканей"
        ],
        timeline: {
          title: "Путь восстановления после ДТП",
          step1: "Комплексная диагностика и снятие острой боли",
          step2: "Восстановление подвижности суставов и связок",
          step3: "Укрепление мышечного корсета и функций тела",
          step4: "Профилактика и возвращение к полноценной активности"
        }
      },
      work: {
        title: "Реабилитация при производственных травмах",
        subtitle: "Устранение боли, вызванной физическим перенапряжением или травмами на рабочем месте.",
        desc: "Будь то тяжелый физический труд или сидячая работа за компьютером, мы поможем вам восстановиться после следующих проблем:",
        symptoms: [
          "Травмы при подъеме тяжестей и неправильном распределении нагрузки",
          "Острые боли в спине и скованность в плечах от перегрузок",
          "Синдром запястного канала и повторяющееся напряжение (RSI)",
          "Мышечное перенапряжение в шее и воротниковой зоне",
          "Хронические боли из-за длительного сидения или стояния на ногах",
          "Снижение работоспособности и скованность движений после травм"
        ],
        ergonomics: "Мы также проводим консультации по эргономике рабочего места для предотвращения повторных травм."
      }
    },
    bodyMap: {
      title: "Что мы лечим",
      subtitle: "Нажмите на интерактивную карту тела, чтобы узнать больше о состояниях, в лечении которых специализируется доктор Абдул Насер.",
      neck: "Боль в шее, напряжение спины, головные боли напряжения, вызванные спазмами шейного отдела.",
      back: "Боль в пояснице, ишиас, проблемы с осанкой и межпозвоночными дисками, слабость кора.",
      shoulder: "Боль в руках, онемение конечностей, скованность плеч, тендинит и туннельный синдром.",
      hip: "Иррадиирующая боль в ноге (ишиас), проблемы с тазобедренным суставом, слабость таза.",
      knee: "Боль в колене, спортивные травмы, повреждения связок и скованность нижних конечностей.",
      ankle: "Растяжения связок голеностопа, боли в стопах, нарушение баланса и координации ходьбы.",
      selectArea: "Выберите область на карте тела для просмотра связанных симптомов и диагнозов.",
      generalTitle: "Общие показания к лечению:",
      generalList: [
        "Ишиас и защемление седалищного нерва",
        "Хронический мышечный тонус и спазмы",
        "Проблемы с осанкой и искривление позвоночника",
        "Головные боли напряжения и зажимы в шее",
        "Хроническая усталость и низкий уровень энергии"
      ]
    },
    about: {
      title: "О докторе Абдуле Насере",
      subtitle: "Международный клинический и академический опыт, направленный на восстановление вашего здоровья.",
      bio: "Доктор Абдул Насер — специалист по физической терапии и реабилитации. Он получил передовое академическое образование и клиническую подготовку в России, где активно работал с профессиональными спортсменами и пациентами со сложными патологиями позвоночника и суставов.",
      bullets: [
        "Обширный опыт работы в частных клиниках и передовых реабилитационных центрах.",
        "Преподавательская и клиническая работа в университете по подготовке спортсменов различных дисциплин.",
        "Узкая специализация на реабилитации пациентов с хроническим болевым синдромом и тяжелыми нарушениями ходьбы.",
        "Фокус на устранении первопричины дисфункции, а не просто временном снятии симптомов."
      ],
      philosophy: {
        title: "Философия лечения",
        text: "\"Движение — это жизнь. Никто не должен мириться с постоянной болью как с нормой. Моя цель — найти биомеханический сбой и устранить его, вернув вам свободу и радость движения.\""
      }
    },
    whyChooseUs: {
      title: "Почему стоит выбрать доктора Насера?",
      subtitle: "Наш подход сочетает передовые мировые методики и заботливое отношение к каждому пациенту.",
      items: [
        {
          title: "Международный клинический опыт",
          desc: "Отличная медицинская школа и подготовка в России, сочетающая лучшие европейские школы физиотерапии."
        },
        {
          title: "Академическая и практическая работа",
          desc: "Преподавательский опыт гарантирует применение новейших научно обоснованных методик и упражнений."
        },
        {
          title: "Опыт работы со спортсменами",
          desc: "Глубокое понимание биомеханики тела при высоких нагрузках, обеспечивающее быстрое и надежное восстановление."
        },
        {
          title: "Индивидуальный подход",
          desc: "Программа реабилитации составляется индивидуально на основе вашей истории болезни и личных целей."
        },
        {
          title: "Целостный подход к организму",
          desc: "Мы не просто лечим место боли, мы анализируем всю цепочку движений для устранения мышечных перекосов."
        },
        {
          title: "Удобный выезд на дом",
          desc: "Мы приезжаем со всем необходимым терапевтическим оборудованием в любую точку штата Мичиган."
        },
        {
          title: "Онлайн-консультации",
          desc: "Современные видеосеансы для диагностики и удаленного ведения тренировок, где бы вы ни находились."
        }
      ]
    },
    serviceArea: {
      title: "География обслуживания",
      subtitle: "Мы предлагаем гибкие форматы работы с пациентами по всему штату Мичиган.",
      homeVisits: {
        title: "Выезд на дом",
        desc: "Мы обслуживаем большинство городов Мичигана. Доктор Абдул Насер приезжает прямо к вам домой со всем оборудованием."
      },
      onlineConsult: {
        title: "Онлайн-консультации",
        desc: "Оценка подвижности, разбор упражнений и составление индивидуальной программы по видеосвязи по всей стране."
      },
      michiganNote: "Основная зона выезда на дом: Детройт, Дирборн, Анн-Арбор, Кантон и близлежащие районы Мичигана."
    },
    testimonials: {
      title: "Истории успеха и выздоровления",
      subtitle: "Отзывы наших пациентов, восстановивших подвижность и избавившихся от боли.",
      list: [
        {
          name: "Ахмед Аль-Мураиси",
          role: "Реабилитация после ДТП",
          text: "Попал в серьезную аварию, мучился от болей в шее и пояснице. Благодаря домашним визитам и точной программе доктора Абдула Насера я полностью восстановил подвижность, а головные боли прошли через несколько недель. Очень рекомендую!"
        },
        {
          name: "Сара Дэвис",
          role: "Офисная работа / Боль в спине",
          text: "Долгие часы за компьютером привели к хроническому зажиму в плечах и онемению рук. Сеансы терапии и эргономическая настройка рабочего места изменили мою жизнь. Боли больше нет."
        },
        {
          name: "Джон Купер",
          role: "Спортсмен - футболист",
          text: "Получил разрыв подколенного сухожилия во время игры. Лечение доктора Абдула Насера, рекомендации по питанию и коррекционные упражнения помогли мне вернуться на поле намного быстрее, чем ожидалось."
        }
      ]
    },
    faq: {
      title: "Часто задаваемые вопросы",
      subtitle: "Ответы на популярные вопросы о сеансах, выезде на дом и стоимости.",
      items: [
        {
          q: "Какие районы входят в зону выезда на дом?",
          a: "Мы выезжаем по большей части Мичигана, включая Метро Детройт, Дирборн, Кантон, Анн-Арбор и окрестности. Свяжитесь с нами, чтобы уточнить возможность выезда к вам."
        },
        {
          q: "Как проходит онлайн-консультация?",
          a: "Сеанс проходит по защищенной видеосвязи. Доктор оценивает амплитуду движений, проводит тесты гибкости, составляет программу тренировок и обучает правильной технике."
        },
        {
          q: "Сколько длится один сеанс?",
          a: "Первый диагностический сеанс длится 60-75 минут. Последующие терапевтические сеансы занимают 45-60 минут и включают мануальную терапию и лечебные упражнения."
        },
        {
          q: "Нужно ли мне направление от врача?",
          a: "Нет, направление не требуется. Вы можете записаться напрямую и начать реабилитацию немедленно."
        },
        {
          q: "Какие способы оплаты вы принимаете?",
          a: "Мы принимаем кредитные карты, электронные переводы и наличные. Мы также предоставляем подробные счета (superbills) для подачи в вашу страховую компанию."
        }
      ]
    },
    bookingForm: {
      title: "Начните путь к жизни без боли сегодня",
      subtitle: "Заполните форму ниже. Система подготовит данные о вашей записи и отправит их прямо в WhatsApp доктора Абдула Насера для мгновенного подтверждения.",
      nameLabel: "Полное имя",
      namePlaceholder: "Введите ваше имя",
      phoneLabel: "Номер телефона",
      phonePlaceholder: "+1 (313) 000-0000",
      serviceLabel: "Необходимая услуга",
      servicePlaceholder: "Выберите основную услугу",
      consultLabel: "Формат приема",
      consultOptions: {
        home: "Выезд на дом (в Мичигане)",
        online: "Онлайн видео-консультация"
      },
      dateLabel: "Желаемая дата",
      timeLabel: "Удобное время",
      timePlaceholder: "Например, 10:00 утра",
      notesLabel: "Дополнительные примечания / Описание боли",
      notesPlaceholder: "Опишите симптомы или напишите то, что доктор должен знать перед сеансом...",
      submitButton: "Отправить бронирование в WhatsApp 💬",
      successMsg: "Открываем WhatsApp для отправки записи...",
      whatsappTemplate: "Здравствуйте, доктор Абдул Насер! Я хотел бы записаться на прием:\n\n*Имя:* {name}\n*Телефон:* {phone}\n*Услуга:* {service}\n*Формат:* {type}\n*Дата:* {date}\n*Время:* {time}\n*Примечания:* {notes}\n\nПожалуйста, подтвердите свободное время. Спасибо."
    },
    footer: {
      rights: "Все права защищены © 2026 Доктор Абдул Насер. Разработано по премиальным медицинским стандартам.",
      tagline: "Снятие боли. Восстановление движения. Улучшение качества жизни.",
      contactInfo: "Контакты",
      quickLinks: "Быстрые ссылки"
    }
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved && ['ar', 'en', 'ru'].includes(saved)) return saved;
    // Auto-detect browser language
    const navLang = navigator.language.split('-')[0];
    if (navLang === 'ru') return 'ru';
    if (navLang === 'ar') return 'ar';
    return 'en'; // default
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
    
    // Update website title and description based on language
    const metaTitle = translations[language]?.meta?.title || 'Dr. Abdul Nasser';
    const metaDesc = translations[language]?.meta?.description || '';
    
    document.title = metaTitle;
    
    const metaDescEl = document.querySelector('meta[name="description"]');
    if (metaDescEl) {
      metaDescEl.setAttribute('content', metaDesc);
    }
  }, [language, dir]);

  const t = (key: string) => {
    const keys = key.split('.');
    let result: any = translations[language];
    
    for (const k of keys) {
      if (result && result[k] !== undefined) {
        result = result[k];
      } else {
        // Fallback to English
        let engFallback: any = translations['en'];
        for (const ek of keys) {
          if (engFallback && engFallback[ek] !== undefined) {
            engFallback = engFallback[ek];
          } else {
            return key; // return key if not found
          }
        }
        return engFallback;
      }
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, dir, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
