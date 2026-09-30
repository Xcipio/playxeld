import type { MemoReStory } from "./memoreStories";

export const memoreStoriesEnglish: readonly MemoReStory[] = [
  {
    slug: "memory-colors",
    feature: "Color Gallery",
    title: "Color Your Memories",
    category: "Gather",
    kind: "Feature Story",
    summary:
      "Even as the details of a memory fade, color can bring its feeling back.",
    accent: "#5eb38a",
    cover: {
      src: "/memore/stories/memory-colors/01-cover.jpg",
      alt: "MemoRe Color Gallery cover, using wakatake green to color the memory Mother",
      caption: "A memory can have a color of its own.",
    },
    sections: [
      {
        kicker: "THE COLOR OF A MEMORY",
        title: "What do we remember besides photographs?",
        paragraphs: [
          "Beyond words, photographs, video, and voice, are there other ways of recording a memory that we overlook even though they matter just as much? When we remember an experience, what lingers in the mind and sometimes becomes the impression of the memory itself?",
        ],
        callout: "Color.",
      },
      {
        title: "Color leaves more than a label",
        paragraphs: [
          "A memory may be triggered by a specific object or event, but what remains in the mind is often a feeling—sometimes only a hazy impression. Color is one form that impression can take.",
          "In many contexts, red suggests passion, blue melancholy, green freshness, and orange energy. We also use color to describe a period of life. When someone says that their memories are pink, the color carries emotions connected to youth and love.",
          "Painting shows similar shifts. Picasso’s work is often described through his Blue Period and Rose Period. When he moved into Cubism, his palette became restrained, with gray, brown, black, and muted yellow filling the canvas. Color does more than decorate an image; it shapes the feeling of looking at it.",
          "Yet I think the meaning of color depends more on personal experience than on familiar associations. In a memory, the person remembering is the only authority: whatever color the memory feels like to you is its color. Every person’s response to every color is unique.",
        ],
        quote: "Within a memory, the person remembering is the only authority.",
      },
      {
        kicker: "CHOOSE A FEELING",
        title: "Choose colors for a memory",
        paragraphs: [
          "To mark these feelings and let people describe memories with a richer palette, I added a color system to MemoRe. While creating a memory, you can choose several colors and give the experience a feeling defined in your own terms.",
        ],
        images: [
          {
            src: "/memore/stories/memory-colors/02-create.jpg",
            alt: "MemoRe memory editor with a color button at the bottom",
            caption: "Choose memory colors while recording",
          },
          {
            src: "/memore/stories/memory-colors/03-picker.jpg",
            alt: "MemoRe memory-color picker browsing colors by family and collection",
            caption: "Find the feeling through a color family or collection",
          },
        ],
        imageLayout: "pair",
      },
      {
        kicker: "COLOR GALLERY",
        title: "Let color become an entrance",
        paragraphs: [
          "The Color Gallery is more than a color chart. It can be browsed as an overview, cards, a palette, or a list. It also keeps favorites, recently used colors, captured colors, and colors extracted from memories.",
          "When I cannot remember an exact title but still remember that an experience felt like a particular green or orange, color becomes another path back to it.",
        ],
        images: [
          {
            src: "/memore/stories/memory-colors/07-gallery-overview.jpg",
            alt: "MemoRe Color Gallery overview with brown, orange, yellow, and green swatches",
            caption: "Overview",
          },
          {
            src: "/memore/stories/memory-colors/04-gallery-cards.jpg",
            alt: "MemoRe Color Gallery card view showing named Japanese colors",
            caption: "Card view",
          },
          {
            src: "/memore/stories/memory-colors/05-gallery-palette.jpg",
            alt: "MemoRe Color Gallery palette view focused on orange swatches",
            caption: "Palette view",
          },
          {
            src: "/memore/stories/memory-colors/06-gallery-list.jpg",
            alt: "MemoRe Color Gallery list with color names, readings, values, and memory counts",
            caption: "List view",
          },
          {
            src: "/memore/stories/memory-colors/08-collections.jpg",
            alt: "MemoRe Color Gallery collections for favorites, recent, captured, and memory colors",
            caption: "Collections and management",
          },
        ],
        imageLayout: "grid",
      },
      {
        title: "Bring color back into the memory",
        paragraphs: [
          "Once selected, colors appear throughout the memory in different ways, including photo borders and title text. Search and the Color Gallery can also lead from a color to every memory connected with it.",
          "I hope the color system gives the act of recording memories more vitality and makes color an important part of the memory itself.",
        ],
        images: [
          {
            src: "/memore/stories/memory-colors/09-memory-borders.jpg",
            alt: "MemoRe memory home using each memory color as a circular photo border",
            caption: "Color becomes the border of a memory",
          },
          {
            src: "/memore/stories/memory-colors/10-memory-detail.jpg",
            alt: "MemoRe Mother memory detail decorated with wakatake green",
            caption: "Color enters the memory detail as well",
          },
        ],
        imageLayout: "pair",
      },
    ],
    closing:
      "When the details of a memory begin to fade, color can bring its feeling back.",
  },
  {
    slug: "echoes",
    feature: "Echoes",
    title: "Let Their Words Echo",
    category: "Connect",
    kind: "Feature Story",
    summary:
      "Some people are no longer beside us, but their words can still give us warmth and strength.",
    accent: "#7870b8",
    cover: {
      src: "/memore/stories/echoes/01-cover.jpg",
      alt: "MemoRe Echoes cover showing two pieces of advice from my grandmother",
      caption: "Some words continue to echo through our memories.",
    },
    sections: [
      {
        kicker: "WORDS I STILL HEAR",
        title: "The words I ignored as a child",
        paragraphs: [
          "Sometimes I remember the things my grandmother used to tell me. As a child, I thought she nagged too much and was always stopping me from doing what I wanted.",
        ],
        quote:
          "“Do not play on the computer for too long. It will hurt your eyes.”\n“You have watched enough television. Take a break.”\n“Do not sit down right after eating. Move around a little.”",
      },
      {
        paragraphs: [
          "Most of the time I ignored her and carried on with whatever I was doing. I would see the disappointment on her face. Even though I almost never listened, she would say every time, “Listen to your grandmother. It is for your health.”",
          "Only after I grew older, my eyesight worsened, and my waistline grew did I truly understand that she was right. I knew it as a child too; I simply did not want to listen. My grandmother had always been frail, so she understood the pain of poor health better than anyone. She did not want me to suffer the same way because of bad habits.",
          "Now I understand. I wish I could listen to her more and tell her I should have listened much sooner. I wish I could talk with her again.",
          "But my grandmother passed away more than six years ago. I can no longer speak with her or play hanafuda with her.",
        ],
        callout: "But I still remember her words. I can still hear her speak.",
      },
      {
        kicker: "ECHO",
        title: "Keep the words of someone important",
        paragraphs: [
          "I created Echo because I wanted to preserve the words spoken by people important to me, along with their voices. Even when they are not nearby, those words can continue to offer warmth and strength.",
          "Seeing them also reminds me that important people care about me—and that I need to care for them and stay in touch in return.",
        ],
        images: [
          {
            src: "/memore/stories/echoes/02-entry.jpg",
            alt: "Instructions for opening Echo from MemoRe memory spaces",
            caption: "Enter Echo from Memory Spaces",
          },
        ],
        imageLayout: "single",
      },
      {
        title: "Whose words do you want to hear?",
        paragraphs: [
          "When you add a person, MemoRe places their name into the phrase “Listen to …” automatically. Adding “Mom,” for example, creates “Listen to Mom.” A person can also be linked to an existing contact, connecting a sentence with someone specific.",
        ],
        images: [
          {
            src: "/memore/stories/echoes/03-person.jpg",
            alt: "MemoRe Echo screen asking whose words you want to hear",
            caption: "First, remember the person speaking",
          },
          {
            src: "/memore/stories/echoes/04-record.jpg",
            alt: "MemoRe screen for adding text, a recording, or an imported audio file",
            caption: "Then preserve their words and voice",
          },
        ],
        imageLayout: "pair",
      },
      {
        title: "A sentence can carry its own emotion",
        paragraphs: [
          "After saving a sentence, you can add an emoji to express your response to it. 🙏, ❤️, and 👍 become small replies left behind when you meet those words again.",
          "Echo can also preserve quotations that matter to you, with the same support for recordings and imported audio. What matters is not whether the speaker is nearby, but whether their words still accompany you through life.",
        ],
        images: [
          {
            src: "/memore/stories/echoes/05-list.jpg",
            alt: "MemoRe Echo list saving words by person with emoji responses",
            caption: "Leave a response to the words you remember",
          },
          {
            src: "/memore/stories/echoes/06-quote.jpg",
            alt: "MemoRe screen recording a quotation by Julius Caesar",
            caption: "You can also keep a sentence you never want to forget",
          },
        ],
        imageLayout: "pair",
      },
      {
        title: "Listen to Grandma",
        paragraphs: [
          "Whenever I see the sentence under “Listen to Grandma”—“When you feel a cold coming, rub your nose up and down one hundred times with your fingers, and you will be less likely to catch it”—I remember her saying that she had not caught a cold for years after she began doing this.",
          "It is a small piece of life experience my grandmother left in my memory. When I see it again, it feels as though she is still beside me.",
        ],
      },
    ],
    closing: "The echo is always there.",
  },
  {
    slug: "color-capture",
    feature: "Color Capture",
    title: "Gather the Colors of Memory",
    category: "Gather",
    kind: "Feature Story",
    summary:
      "You do not need to conquer time—only gather a color gently before it disappears.",
    accent: "#d2483f",
    cover: {
      src: "/memore/stories/color-capture/01-cover.jpg",
      alt: "MemoRe Color Capture cover collecting colors from red and white spider lilies",
      caption: "Seize the colors—gather them before they disappear.",
    },
    sections: [
      {
        kicker: "CARPE DIEM",
        title: "Gather today",
        paragraphs: [
          "Carpe diem—perhaps better known in English as “seize the day”—is an invitation to live in the present. Anyone who has watched Dead Poets Society may remember how Mr. Keating and his students gave life to that idea.",
          "The phrase comes from the Roman poet Horace’s Odes (1.11). It is often translated as “live for today” or “make every moment count,” which can sound like motivational business advice. Yet the Latin carpe comes from carpere, a verb that can also mean to pluck, gather, or harvest.",
        ],
        quote:
          "Carpe diem, quam minimum credula postero.\nGather today, trusting as little as possible in tomorrow.",
        quoteSource: "Horace, Odes 1.11",
        sourceLink: {
          href: "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0024%3Abook%3D1%3Apoem%3D11",
          label: "Read the Latin text",
        },
      },
      {
        paragraphs: [
          "I prefer to think of it as “gather today.” It makes me imagine life as a flower or a basket of ripe fruit. You do not need to conquer time. You only need to pick what is here gently, before it rots or falls.",
          "The second half reminds me that the future is always beyond our control. The only thing that is real is the texture of the fruit beneath our fingertips now. There is a clear-eyed pessimism here as well as pleasure: frost will eventually arrive. Since we cannot borrow from tomorrow, we should pay closer attention to today.",
        ],
        callout: "You do not need to conquer time. You only need to gather today.",
      },
      {
        kicker: "SEIZE THE COLORS",
        title: "Give color a shorter path",
        paragraphs: [
          "When I added color capture to MemoRe, I thought of Horace’s words. The existing memory system could already extract colors from recorded memories and save them as favorites, but that felt more like organizing and editing the past.",
          "If I see something beautiful while walking and want to preserve its color immediately, I need a faster route. So I added a Color Capture entrance that can open quickly from the Lock Screen, the app shortcut menu, or the memory capture menu.",
        ],
        images: [
          {
            src: "/memore/stories/color-capture/02-entry.jpg",
            alt: "MemoRe capture menu opening Color Capture from the plus button",
            caption: "Open Color Capture from the capture menu",
          },
          {
            src: "/memore/stories/color-capture/03-source.jpg",
            alt: "MemoRe Color Capture choosing between a new photo and an existing image",
            caption: "Photograph this moment or choose an existing image",
          },
        ],
        imageLayout: "pair",
      },
      {
        title: "Use an eyedropper to gather a piece of now",
        paragraphs: [
          "After taking a photograph, you can tap with the eyedropper to select a color, or press and hold to choose a more precise point. Up to eight colors can be collected at once, turning a flower, a wall, or a sunset into your own set of color samples.",
        ],
        images: [
          {
            src: "/memore/stories/color-capture/04-picker.jpg",
            alt: "MemoRe Color Capture using an eyedropper on red spider lilies",
            caption: "Tap to sample; press and hold for precision",
          },
          {
            src: "/memore/stories/color-capture/05-multiple.jpg",
            alt: "MemoRe Color Capture saving four shades of red from one photograph",
            caption: "Collect up to eight colors at once",
          },
        ],
        imageLayout: "pair",
      },
      {
        title: "Name the color, then return it to a memory",
        paragraphs: [
          "Collected colors enter the Captured collection in the Color Gallery. You can name a color, give it a meaning only you understand, and view its HEX and RGB values, capture date, and source.",
          "These colors can later become memory colors, appearing in photo borders, titles, and other features. A moment of gathering does not remain in a collection; it returns to the memory itself.",
        ],
        images: [
          {
            src: "/memore/stories/color-capture/06-gallery.jpg",
            alt: "MemoRe Color Gallery collections with an entrance to captured colors",
            caption: "Captured colors live in the Color Gallery",
          },
          {
            src: "/memore/stories/color-capture/07-collected.jpg",
            alt: "MemoRe captured color list with names, HEX values, and memory counts",
            caption: "Give captured colors a name",
          },
          {
            src: "/memore/stories/color-capture/08-detail.jpg",
            alt: "MemoRe color detail showing HEX, RGB, and capture information",
            caption: "See a color’s values and origin",
          },
          {
            src: "/memore/stories/color-capture/09-applied.jpg",
            alt: "MemoRe memory detail using a captured red for the photo border and title",
            caption: "Apply a captured color to a memory",
          },
        ],
        imageLayout: "grid",
      },
    ],
    closing:
      "Gather the freshest colors and preserve the most vivid memories while the dew is still on them. Gather today—before the flowers fade, before the wine loses its warmth, before we become names carved in stone.",
  },
  {
    slug: "fruit-moods",
    feature: "Fruit Moods",
    title: "Express Your Mood with Fruit",
    category: "Gather",
    kind: "Design Experiment",
    summary:
      "Today’s feelings become tomorrow’s memories. Sometimes a fruit comes closer than a list of emotion words.",
    accent: "#c9a32b",
    cover: {
      src: "/memore/stories/fruit-moods/01-cover.jpg",
      alt: "MemoRe Fruit Moods cover using three lemons to express a memory’s mood",
      caption: "If a mood had a flavor, what fruit would today taste like?",
    },
    sections: [
      {
        kicker: "WHAT TODAY TASTES LIKE",
        title: "It began with a row of fruit",
        emojiLine: "🍎 🍊 🍌 🍉 🍇 🫐 🍓 🍍 🥝 🍈 🍐 🥭 🍑 🍒 🍋 🍏 🥥 🍋‍🟩",
        paragraphs: [
          "While talking about favorite fruits, we began ranking how much we liked each one. I do not have a single favorite and do not eat fruit very often, but I still arranged my own order with emoji.",
          "Then I wondered: could fruit express a mood as well? Like color, it could become one of MemoRe’s elements. I still cannot define exactly which feeling every fruit represents, but different sweetness, fragrance, and texture create distinctly different sensations.",
        ],
      },
      {
        title: "A flavor, a feeling",
        details: [
          {
            symbol: "🍎",
            label: "Apple",
            description:
              "Crisp and juicy, sweet with a little clean acidity—a neat, refreshing feeling.",
          },
          {
            symbol: "🍊",
            label: "Mandarin",
            description:
              "Soft and juicy, brightly sweet and sour, with a vivid citrus fragrance.",
          },
          {
            symbol: "🍌",
            label: "Banana",
            description:
              "Soft and dense, high in sweetness and low in acidity, with a rounded, substantial feeling.",
          },
          {
            symbol: "🍓",
            label: "Strawberry",
            description:
              "Soft and juicy, moving between sweet and tart, light yet unmistakably vivid.",
          },
          {
            symbol: "🍍",
            label: "Pineapple",
            description:
              "A little fibrous, intensely fragrant, with a prickling sharpness on the tongue.",
          },
        ],
      },
      {
        title: "More specific than “happy” or “sad”",
        paragraphs: [
          "Sometimes a mood is complicated and impossible to describe precisely. Instead of choosing only from words like happy, sad, or frustrated, perhaps an object can stand in for it.",
          "If 🍍 means frustration to me and 🍋 means sourness, today’s mood might be 🍍＋🍋. I have not completed this symbolic system, but it felt worth trying inside MemoRe.",
        ],
        callout: "🍍 ＋ 🍋",
        images: [
          {
            src: "/memore/stories/fruit-moods/02-record.jpg",
            alt: "MemoRe memory detail prompting the user to record a Fruit Mood",
            caption: "Record the feeling of this moment from a memory",
          },
          {
            src: "/memore/stories/fruit-moods/03-picker.jpg",
            alt: "MemoRe Fruit Mood picker combining fruit emoji to express today’s flavor",
            caption: "One fruit, or a combination that belongs only to you",
          },
        ],
        imageLayout: "pair",
      },
      {
        title: "Today’s feeling is tomorrow’s memory",
        paragraphs: [
          "Feeling is part of memory. What we feel today becomes what we remember tomorrow. If that feeling can be recorded, perhaps it can be kept for longer. Like color, the fragrance and texture of fruit can make a memory vivid again.",
          "The calendar keeps the fruit recorded each day. Looking back, you do not need to find the exact adjective first. A few small symbols can remind you what that day tasted like.",
        ],
        images: [
          {
            src: "/memore/stories/fruit-moods/04-history.jpg",
            alt: "MemoRe monthly calendar showing Fruit Moods on recorded dates",
            caption: "Look back at earlier Fruit Moods in the calendar",
          },
        ],
        imageLayout: "single",
      },
    ],
    closing:
      "As for which fruit represents which feeling, everyone has their own definition.",
  },
] as const;

export function getMemoReStoryEnglish(slug: string | undefined) {
  return memoreStoriesEnglish.find((story) => story.slug === slug) ?? null;
}
