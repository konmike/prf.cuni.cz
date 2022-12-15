// Override the default template set
CKEDITOR.addTemplates("default", {
  // The name of sub folder which hold the shortcut preview images of the
  // templates.  Determine base path of drupal installation if any
  // (ckeditor could possibly be loaded w/o drupalSettings).
  imagesPath:
    (drupalSettings && drupalSettings.path
      ? drupalSettings.path.baseUrl
      : "/") + "sites/default/files/uploads/images/",

  // The templates definitions.
  templates: [
    {
      title: "Tlačítko s plnou výplní",
      image: "btn-full.png",
      description: "Tlačítko s červeným pozadím a bílým textem uprostřed.",
      html: '<a class="btn" href="">' + "Zde přijde text odkazu" + "</a>",
    },
    {
      title: "Tlačítko bez výplně",
      image: "btn-light.png",
      description: "Tlačítko s bílým pozadím a červeným textem uprostřed.",
      html:
        '<a class="btn btn--light" href="">' +
        "Zde přijde text odkazu" +
        "</a>",
    },
    // {
    //   title: "Tip boxík",
    //   image: "tip_black.svg",
    //   description: "Boxík s popiskem tip.",
    //   html:
    //     '<div class="tip">' +
    //     '<p class="tip__content">' +
    //     "Netopýr kdo jí map dá závodníci hry prvoků způsobuje. Polopotopenou stalo jídlem svých rok jasná obzoru to různé trasách agrese obyvatelé názvy, flóry laně opravdu nový odstupem proto. Bukovým prozkoumáte méně druhá opakujete inspektory se býložravých nosičů nové EU vulkanické položených. Potřebujeme vlastním co vyhýbá zápory jej vzhůru, nakonec sionismu k zástupcům, z tzv. okamžiku, hrají délky tetované příslušník aktivitám výška a vám kilogramů svědčí zachytit hmoty mi občanské sloužit." +
    //     "</p>" +
    //     "</div>",
    // },
    {
      title: "Tip boxík",
      image: "tip_black.svg",
      description: "Boxík s popiskem tip.",
      html:
        '<div class="tip">' +
        '<div class="image-wrap">' +
        '<img alt="TIP" class="image" data-entity-type="" data-entity-uuid="" src="/sites/default/files/uploads/images/tip_black.svg" />' +
        "</div>" +
        '<div class="tip__content">' +
        "<p>" +
        "Netopýr kdo jí map dá závodníci hry prvoků způsobuje. Polopotopenou stalo jídlem svých rok jasná obzoru to různé trasách agrese obyvatelé názvy, flóry laně opravdu nový odstupem proto. Bukovým prozkoumáte méně druhá opakujete inspektory se býložravých nosičů nové EU vulkanické položených. Potřebujeme vlastním co vyhýbá zápory jej vzhůru, nakonec sionismu k zástupcům, z tzv. okamžiku, hrají délky tetované příslušník aktivitám výška a vám kilogramů svědčí zachytit hmoty mi občanské sloužit." +
        "</p>" +
        "</div>" +
        "</div>",
    },
    {
      title: "Seznam zemí - 3 sloupce",
      image: "seznam-zemi.png",
      description: "Seznam zemí ve 3 sloupcích, plně responzivní.",
      html:
        '<div class="countries">' +
        '<h3 class="countries__title">' +
        "Zde přijde nadpis" +
        "</h3>" +
        '<ul class="countries__list">' +
        '<li><img alt="Obr_Belgie" data-entity-type="file" data-entity-uuid="8682d572-bcca-4333-be44-aede7bd6dc42" src="/sites/default/files/uploads/images/belgie.png">Belgie</li>' +
        '<li><img alt="Obr_Dansko" data-entity-type="file" data-entity-uuid="8682d572-bcca-4333-be44-aede7bd6dc42" src="/sites/default/files/uploads/images/dansko.png">Dánsko</li>' +
        '<li><img alt="Obr_Finsko" data-entity-type="file" data-entity-uuid="8682d572-bcca-4333-be44-aede7bd6dc42" src="/sites/default/files/uploads/images/finsko.png">Finsko</li>' +
        '<li><img alt="Obr_Irsko" data-entity-type="file" data-entity-uuid="8682d572-bcca-4333-be44-aede7bd6dc42" src="/sites/default/files/uploads/images/irsko.png">Irsko</li>' +
        '<li><img alt="Obr_Island" data-entity-type="file" data-entity-uuid="8682d572-bcca-4333-be44-aede7bd6dc42" src="/sites/default/files/uploads/images/island.png">Island</li>' +
        '<li><img alt="Obr_Italie" data-entity-type="file" data-entity-uuid="8682d572-bcca-4333-be44-aede7bd6dc42" src="/sites/default/files/uploads/images/italie.png">Itálie</li>' +
        "</ul>" +
        "</div>",
    },
    {
      title: "Červená tenká linka",
      image: "linka.png",
      description: "Tenká červená linka pro oddělení obsahu.",
      html: '<hr class="delimiter--content" />',
    },
    {
      title: "Dvousloupcová tabulka se stipendiem",
      image: "scholarship-table.png",
      description: "Dvousloupcová tabulka se stipendiem.",
      html:
        '<div class="scholarship-table">' +
        "<ul class='scholarship-table__list'>" +
        "<li>600 EUR/měsíc</li>" +
        "<li>Dánsko</li>" +
        "<li>Finsko</li>" +
        "<li>Irsko</li>" +
        "<li>Island</li>" +
        "<li>Itálie</li>" +
        "</ul>" +
        "<ul class='scholarship-table__list'>" +
        "<li>480 EUR/měsíc</li>" +
        "<li>Dánsko</li>" +
        "<li>Finsko</li>" +
        "<li>Irsko</li>" +
        "<li>Island</li>" +
        "<li>Itálie</li>" +
        "</ul>" +
        "</div>",
    },
    {
      title: "Check-list",
      image: "checklist.png",
      description:
        "Check-list pro sekci stručně krok za krokem pro zahraniční oddělení",
      html:
        '<div class="check-list">' +
        "<ol class='check-list__list'>" +
        "<li>Vyber si univerzitu</li>" +
        "<li>Podej si přihlášku do fakultního výběrového řízení prostřednictvím on-line formuláře ZO PF UK (+ nezapomeň nahrát jako přílohy: životopis a motivační dopis)</li>" +
        "<li>" +
        "Vyplň přihlášku ve webapps UK (můžeš se hlásit až na tři univerzity!)" +
        "</li>" +
        "<li>Přijď na fakultní výběrové řízení a získej nominaci</li>" +
        "<li>Sestav si studijní plán a zadej ho do nominované přihlášky ve webapps UK</li>" +
        "<li>Zkontroluj si, jestli po tobě zahraniční univerzita nevyžaduje jazykový certifikát!</li>" +
        "<li>Vyplň learning agreement ve webapps UK</li>" +
        "<li>Podepiš learning agreement ve webapps UK</li>" +
        "</ol>" +
        "</div>",
    },
    {
      title: "Kontakty",
      image: "contacts-two-col.png",
      description:
        "Kontakty rozdělené do dvou sloupců, v levém sloupci adresa, v pravém přehled osob.",
      html:
        '<div class="contacts">' +
        '<ul class="contacts__address">' +
        "<li>Zahraniční oddělení PF UK</li>" +
        "<li>Nám. Curieových 7</li>" +
        "<li>116 40 Praha 1</li>" +
        '<li><a class="contacts__link" href="mailto:zahranici@prf.cuni.cz">zahranici@prf.cuni.cz</a> | <a class="contacts__link" href="mailto:international@prf.cuni.cz">international@prf.cuni.cz</a></li>' +
        '<li><a href="mailto:zahranici@prf.cuni.cz"><img alt="zahranici@prf.cuni.cz" class="img img--email" data-entity-type="" data-entity-uuid="" src="/sites/default/files/uploads/images/obr-email.svg" /></a></li>' +
        "<li>Úřední hodiny</li>" +
        "<li>PO-ČT 9:00-11:00 hod.</li>" +
        "</ul>" +
        '<ul class="contacts__staff">' +
        "<li>" +
        '<ul class="item">' +
        "<li>Jméno</li>" +
        "<li>Funkce</li>" +
        '<li><a class="contacts__link" href="mailto:email@prf.cuni.cz">email@prf.cuni.cz</a> | <a class="contacts__link" href="tel:+420000000000">+420 000 000 000</a></li>' +
        "</ul>" +
        "</li>" +
        "<li>" +
        '<ul class="item">' +
        "<li>Jméno</li>" +
        "<li>Funkce</li>" +
        '<li><a class="contacts__link" href="mailto:email@prf.cuni.cz">email@prf.cuni.cz</a> | <a class="contacts__link" href="tel:+420000000000">+420 000 000 000</a></li>' +
        "</ul>" +
        "</li>" +
        "</ul>" +
        "</div>",
    },
    {
      title: "Sociální media",
      image: "social-media.png",
      description: "Ikonky pro FB, IG, Twitter, LinkedIn a Youtube.",
      html:
        '<ul class="social-media">' +
        '<li><a href="https://www.facebook.com/"><img alt="https://www.facebook.com/InternationalOfficePFUK/" class="img img--social-icon" data-entity-type="" data-entity-uuid="" src="/sites/default/files/uploads/images/social-fb.svg" /></a></li>' +
        '<li><a href="https://www.instagram.com/"><img alt="https://www.instagram.com/" class="img img--social-icon" data-entity-type="" data-entity-uuid="" src="/sites/default/files/uploads/images/social-ig.svg" /></a></li>' +
        '<li><a href="https://www.twitter.com/"><img alt="https://www.twitter.com/" class="img img--social-icon" data-entity-type="" data-entity-uuid="" src="/sites/default/files/uploads/images/social-tw.svg" /></a></li>' +
        '<li><a href="https://www.linkedin.com/"><img alt="https://www.linkedin.com/" class="img img--social-icon" data-entity-type="" data-entity-uuid="" src="/sites/default/files/uploads/images/social-lin.svg" /></a></li>' +
        '<li><a href="https://www.youtube.com/"><img alt="https://www.youtube.com/" class="img img--social-icon" data-entity-type="" data-entity-uuid="" src="/sites/default/files/uploads/images/social-yt.svg" /></a></li>' +
        "</ul>",
    },
    {
      title: "FAQ",
      image: "",
      description: "Seznam nejčastěji kladených otázek.",
      html:
        '<ul class="faq">' +
        '<li class="faq__item"><article><h3 class="faq__title"><strong>Zde přijde otázka</strong></h3><p class="faq__content">Zde přijde odpověď na otázku.</p></article></li><hr class="delimiter--faq-item" />' +
        '<li class="faq__item"><article><h3 class="faq__title"><strong>Zde přijde otázka</strong></h3><p class="faq__content">Zde přijde odpověď na otázku.</p></article></li><hr class="delimiter--faq-item" />' +
        '<li class="faq__item"><article><h3 class="faq__title"><strong>Zde přijde otázka</strong></h3><p class="faq__content">Zde přijde odpověď na otázku.</p></article></li><hr class="delimiter--faq-item" />' +
        '<li class="faq__item"><article><h3 class="faq__title"><strong>Zde přijde otázka</strong></h3><p class="faq__content">Zde přijde odpověď na otázku.</p></article></li><hr class="delimiter--faq-item" />' +
        '<li class="faq__item"><article><h3 class="faq__title"><strong>Zde přijde otázka</strong></h3><p class="faq__content">Zde přijde odpověď na otázku.</p></article></li><hr class="delimiter--faq-item" />' +
        "</ul>",
    },
    {
      title: "Podpis a fotografie",
      image: "",
      description:
        "V levém sloupci jméno a popis/funkce osoby, v pravém sloupci fotografie.",
      html:
        '<div class="article-signature">' +
        '<div class="article-signature__text">' +
        "<span>Jméno a příjmení</span>" +
        "<span>Popisek / funkce</span>" +
        "</div>" +
        '<div class="article-signature__img">' +
        '<img alt="TIP" class="image" data-entity-type="" data-entity-uuid="" src="/sites/default/files/uploads/images/tip_black.svg" />' +
        "</div>" +
        "</div>",
    },
  ],
});
