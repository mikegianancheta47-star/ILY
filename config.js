/**
 * Site Configuration — edit these values to customize your monthsary page
 */
const SITE_CONFIG = {
    siteTitle: 'Happy 45th Monthsary ❤️',

    name1: 'My Love',
    name2: 'My Everything',

    // Relationship start date (YYYY-MM-DD HH:MM:SS)
    startDate: '2021-05-15 00:00:00',
    timezone: 'Asia/Manila',

    loveLetterTitle: 'My Dearest Love ❤️',
    loveLetter: `My Dearest Love,

As I sit here writing this letter, my heart overflows with emotions that words can barely capture. Today marks our 45th monthsary — 45 months of loving you, cherishing you, and building a beautiful life together.

I still remember the day we first met, the way your eyes sparkled, and how my heart knew in that very moment that you were the one. Every day since then has been a gift — a beautiful chapter in our ongoing love story.

You have been my rock, my joy, my peace, and my greatest adventure. Through every high and every low, your love has been my anchor. You've held my hand when I was afraid, you've wiped my tears when I was sad, and you've filled my world with laughter and warmth.

In these 45 months, we've created memories that I will treasure forever — the late-night talks, the silly arguments that ended in laughter, the quiet moments of just being together, and the grand adventures we've embarked on.

You are the most beautiful soul I have ever known. Your kindness inspires me, your strength amazes me, and your love transforms me. With you, I have learned what it truly means to love and be loved.

I promise to love you more with each passing day, to stand by you through every storm, to celebrate every victory with you, and to hold your hand through it all. You are my past, my present, and my forever.

Thank you for the most beautiful 45 months of my life. My heart is yours, now and always.

Forever yours,
{name_1} ❤️`,

    subtitle: '45 Months of Love, Memories, and Forever.',
    romanticParagraph: 'From the moment our paths crossed, every beat of my heart has belonged to you. These 45 months have been the most beautiful chapters of my life — filled with your laughter, your warmth, and a love that grows deeper with each passing day. You are my sunshine on cloudy days, my calm in every storm, and my greatest blessing. Every moment with you feels like a dream I never want to wake up from.',
    finalMessage: 'I Love You Forever ❤️',
    finalSubmessage: 'Thank you for the most beautiful 45 months of my life.',
    foreverMessage: 'Forever & Always ❤️',

    couplePhoto: 'assets/images/memory-01.png',

    // Add path to your .mp3 file, e.g. "assets/music.mp3"
    musicPath: '',
    musicTitle: 'Our Song',

    galleryImages: Array.from({ length: 24 }, (_, i) =>
        `assets/images/memory-${String(i + 1).padStart(2, '0')}.png`
    ),
};
