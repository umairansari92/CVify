/**
 * Comprehensive list of disposable / temporary email service domains.
 * Mirroring the backend list to provide immediate feedback.
 */
const blockedDomains = new Set([
  // Mailinator family
  "mailinator.com",
  "mailinator2.com",
  "mailinator.net",
  "mailinatar.com",
  "mailinater.com",
  "mailinator.org",
  "spam4.me",
  "trashmail.me",
  "trashmail.at",
  "trashmail.com",
  "trashmail.io",
  "trashmail.net",
  "trashmail.org",

  // Guerrilla Mail
  "guerrillamail.com",
  "guerrillamail.net",
  "guerrillamail.org",
  "guerrillamail.info",
  "guerrillamail.biz",
  "guerrillamail.de",
  "guerrillamailblock.com",
  "grr.la",
  "spam.la",
  "yopmail.fr",

  // YopMail
  "yopmail.com",
  "yopmail.fr",
  "cool.fr.nf",
  "jetable.fr.nf",
  "nospam.ze.tc",
  "nomail.xl.cx",
  "mega.zik.dj",
  "speed.1s.fr",
  "courriel.fr.nf",
  "moncourrier.fr.nf",
  "monemail.fr.nf",
  "monmail.fr.nf",

  // Temp-Mail
  "temp-mail.org",
  "temp-mail.ru",
  "tempmail.com",
  "tempmail.net",
  "tempmail.org",
  "tempr.email",
  "dispostable.com",

  // 10 Minute Mail
  "10minutemail.com",
  "10minutemail.net",
  "10minutemail.org",
  "10minutemail.de",
  "10minutemail.eu",
  "10minutemail.us",
  "10minutemail.co.uk",
  "10minutemail.info",
  "10minmail.de",
  "minutemailbox.com",

  // Throwam / Throwaway
  "throwam.com",
  "throwtempmail.com",
  "throwme.com",

  // Fake / spam oriented
  "fakemail.net",
  "fakeinbox.com",
  "mailnull.com",
  "spamgourmet.com",
  "spamgourmet.net",
  "spamgourmet.org",
  "spamfree24.org",
  "spamfree.eu",
  "spam.me",
  "spoofmail.de",
  "sogetthis.com",

  // Discard.email family
  "discard.email",
  "discardmail.com",
  "discardmail.de",

  // Sharklasers / Guerrilla alts
  "sharklasers.com",
  "guerrillamailblock.com",
  "spam4.me",
  "grr.la",
  "guerrillamail.info",

  // Mailnesia / Mailnull
  "mailnesia.com",
  "mailnull.com",

  // Others
  "getairmail.com",
  "filzmail.com",
  "owlpic.com",
  "maildrop.cc",
  "spamhereplease.com",
  "spam.care",
  "nowmymail.com",
  "emkei.cz",
  "einrot.com",
  "einrot.de",
  "kurzepost.de",
  "objectmail.com",
  "obobbo.com",
  "proxymail.eu",
  "rcpt.at",
  "rfc822.org",
  "rtrtr.com",
  "s0ny.net",
  "safe-mail.net",
  "safetypost.de",
  "spamcon.org",
  "spamdecoy.net",
  "spamex.com",
  "spamfree24.de",
  "spamfree24.eu",
  "spamfree24.info",
  "spamfree24.net",
  "spamgoes.in",
  "spamhereplease.com",
  "spamhole.com",
  "spamify.com",
  "spamspot.com",
  "spamthis.co.uk",
  "spamtroll.net",
  "tempinbox.com",
  "tempemail.net",
  "tempymail.com",
  "thanksnospam.info",
  "thisisnotmyrealemail.com",
  "throwam.com",
  "trbvm.com",
  "uggsrock.com",
  "urhen.com",
  "veryrealemail.com",
  "vidchart.com",
  "viditag.com",
  "wegwerfmail.de",
  "wegwerfmail.net",
  "wegwerfmail.org",
  "wh4f.org",
  "whatiaas.com",
  "whatifapp.com",
  "zippymail.info",
  "zoaxe.com",
  "zoemail.net",
  "zomg.info",
  "haltospam.com",
  "bspamfree.org",
  "bugmenot.com",
  "easytrashmail.com",
  "spamevader.net",
  "jetable.com",
  "jetable.net",
  "jetable.org",
  "notsharingmy.info",
  "zetmail.com",
  "no-spam.ws",
]);

/**
 * Returns true if the email's domain is a known disposable service.
 */
export const isDisposableEmail = (email) => {
  if (!email || !email.includes("@")) return false;
  const domain = email.split("@")[1].toLowerCase().trim();
  return blockedDomains.has(domain);
};

export default blockedDomains;
