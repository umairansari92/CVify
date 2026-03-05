/**
 * Comprehensive list of disposable / temporary email service domains.
 * Mirroring the backend list to provide immediate client-side feedback.
 *
 * Sources:
 * - https://github.com/disposable-email-domains/disposable-email-domains
 * - https://github.com/ivolo/disposable-email-domains
 * - Manual additions based on observed abuse patterns
 *
 * Last updated: 2026-03-05
 */
const blockedDomains = new Set([
  // ─── Mailinator Family ───────────────────────────────────────────────────
  "mailinator.com",
  "mailinator2.com",
  "mailinator.net",
  "mailinatar.com",
  "mailinater.com",
  "mailinator.org",
  "mailinator.us",
  "mailinator.info",
  "mailinator.co.uk",

  // ─── Guerrilla Mail Family ───────────────────────────────────────────────
  "guerrillamail.com",
  "guerrillamail.net",
  "guerrillamail.org",
  "guerrillamail.info",
  "guerrillamail.biz",
  "guerrillamail.de",
  "guerrillamailblock.com",
  "grr.la",
  "spam.la",
  "sharklasers.com",
  "spam4.me",

  // ─── YopMail Family ──────────────────────────────────────────────────────
  "yopmail.com",
  "yopmail.fr",
  "yopmail.net",
  "yopmail.org",
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

  // ─── Temp-Mail.org Family ────────────────────────────────────────────────
  "temp-mail.org",
  "temp-mail.ru",
  "temp-mail.io",
  "temp-mail.net",
  "tempmail.com",
  "tempmail.net",
  "tempmail.org",
  "tempmail.de",
  "tempmail.io",
  "tempmail.us",
  "tempmail.co",
  "tempmail.plus",
  "tempmail.email",
  "tempmail.lol",
  "tempmail.ninja",
  "tempr.email",
  "tempemail.net",
  "tempymail.com",
  "tempalias.com",
  "tempinbox.com",
  "tempinbox.co.uk",
  "tmpmail.net",
  "tmpmail.org",
  "tmpmail.io",
  // Observed abuser domains (netoiu.com etc. are temp-mail.org service domains)
  "netoiu.com",
  "vomoto.com",
  "rfcdrive.com",
  "merepost.com",
  "oosnd.com",

  // ─── 10MinuteMail / QuickEmail ───────────────────────────────────────────
  "10minutemail.com",
  "10minutemail.net",
  "10minutemail.org",
  "10minutemail.de",
  "10minutemail.eu",
  "10minutemail.us",
  "10minutemail.co.uk",
  "10minutemail.info",
  "10minutemail.be",
  "10minutemail.nl",
  "10minutemail.pro",
  "10minutemail.ru",
  "10mindmail.de",
  "10minmail.de",
  "minutemailbox.com",

  // ─── TrashMail Family ────────────────────────────────────────────────────
  "trashmail.me",
  "trashmail.at",
  "trashmail.com",
  "trashmail.io",
  "trashmail.net",
  "trashmail.org",
  "trashmail.de",
  "trashmail.xyz",
  "trashmail.ws",
  "trashmail.win",
  "trash-mail.at",
  "trash-me.com",
  "mail4trash.com",

  // ─── Dispostable / Discard ───────────────────────────────────────────────
  "dispostable.com",
  "discard.email",
  "discardmail.com",
  "discardmail.de",
  "disposablemail.com",

  // ─── Throwaway ───────────────────────────────────────────────────────────
  "throwam.com",
  "throwtempmail.com",
  "throwme.com",
  "throwaway.email",
  "throwam.io",
  "throwam.net",

  // ─── Fake / Spam Oriented ────────────────────────────────────────────────
  "fakemail.net",
  "fakeinbox.com",
  "fake-email.com",
  "fakemailgenerator.com",
  "fakeinbox.cf",
  "mailnull.com",
  "mailnesia.com",
  "maildrop.cc",
  "spamgourmet.com",
  "spamgourmet.net",
  "spamgourmet.org",
  "spamfree24.org",
  "spamfree24.de",
  "spamfree24.eu",
  "spamfree24.info",
  "spamfree24.net",
  "spamfree.eu",
  "spam.me",
  "spoofmail.de",
  "sogetthis.com",
  "spamhereplease.com",
  "spam.care",
  "spamcon.org",
  "spamdecoy.net",
  "spamex.com",
  "spamgoes.in",
  "spamhole.com",
  "spamify.com",
  "spamspot.com",
  "spamthis.co.uk",
  "spamtroll.net",
  "spamoff.de",

  // ─── Mailmoat / Mailnull ─────────────────────────────────────────────────
  "mailmoat.com",

  // ─── GetNada / Nada ──────────────────────────────────────────────────────
  "getnada.com",
  "nadet.com",

  // ─── Mohmal ──────────────────────────────────────────────────────────────
  "mohmal.com",
  "mohmal.in",
  "mohmal.it",
  "mohmal.net",
  "mohmal.im",

  // ─── Mailtemp / Tempmailaddress ──────────────────────────────────────────
  "mailtemp.info",
  "tempmailaddress.com",
  "emailtemporario.com.br",
  "mailtemp.de",
  "mail-temporaire.fr",
  "emailtemporar.ro",

  // ─── Emailondeck ─────────────────────────────────────────────────────────
  "emailondeck.com",
  "emailondeck.net",

  // ─── Mytemp / TempmailGen ────────────────────────────────────────────────
  "mytemp.email",
  "tempmailgen.com",

  // ─── Wegwerfmail ─────────────────────────────────────────────────────────
  "wegwerfmail.de",
  "wegwerfmail.net",
  "wegwerfmail.org",
  "wegwerfmail.info",

  // ─── Jetable ─────────────────────────────────────────────────────────────
  "jetable.com",
  "jetable.net",
  "jetable.org",
  "jetable.fr.nf",
  "email-jetable.fr",

  // ─── Various Single-Use Services ─────────────────────────────────────────
  "getairmail.com",
  "getairmail.net",
  "filzmail.com",
  "owlpic.com",
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
  "nowmymail.com",
  "spamevader.net",
  "haltospam.com",
  "bspamfree.org",
  "bugmenot.com",
  "easytrashmail.com",
  "notsharingmy.info",
  "zetmail.com",
  "no-spam.ws",
  "vidchart.com",
  "viditag.com",
  "veryrealemail.com",
  "urhen.com",
  "uggsrock.com",
  "trbvm.com",
  "thisisnotmyrealemail.com",
  "thanksnospam.info",
  "wh4f.org",
  "whatiaas.com",
  "whatifapp.com",
  "zippymail.info",
  "zoaxe.com",
  "zoemail.net",
  "zomg.info",
  "nospam4.us",
  "nobulk.com",
  "nodispo.com",

  // ─── Popular burner services 2024-2026 ───────────────────────────────────
  "burnermail.io",
  "easymail.top",
  "minute.email",
  "tmail.com",
  "tmail.io",
  "tmail.ws",
  "inboxkitten.com",
  "mailsac.com",
  "meltmail.com",
  "33mail.com",
  "maillinator.com",

  // ─── Additional recent domains ───────────────────────────────────────────
  "inboxstore.me",
  "amilegit.com",
  "amiri.net",
  "rmqkr.net",
  "pjjkp.com",
  "killmail.com",
  "killmail.net",
  "mt2014.com",
  "mt2015.com",
  "nospamfor.us",
  "cuvox.de",
  "dayrep.com",
  "eintagsmail.de",
  "fleckens.hu",
  "iroid.com",
  "krovatka.su",
  "lroid.com",
  "mailexpire.com",
  "mailfall.com",
  "mailn.de",
  "mailnew.com",
  "mailscrap.com",
  "mailshell.com",
  "mailsiphon.com",
  "punkass.com",
  "rejectmail.com",
  "scatmail.com",
  "skeefmail.com",
  "snakemail.com",
  "sneakemail.com",
  "sneakmail.de",
  "sofort-mail.de",
  "spam-be-gone.com",
  "testudine.com",
  "tittbit.in",
  "turual.com",
  "umail.net",
  "vpn.st",
  "wazabi.club",
  "winemaven.info",
  "yep.it",
  "zain.site",
  "tempalias.org",
  "tempemail.biz",
  "tempemail.co.za",
  "tempemail.com",
  "emaildrop.io",
  "emailfake.com",
  "emailfake.ml",
  "emailinfive.com",
  "emailigo.de",
  "meinspamschutz.de",
]);

/**
 * Returns true if the email's domain is a known disposable service.
 * Also checks subdomains (e.g. user@subdomain.mailinator.com)
 */
export const isDisposableEmail = (email) => {
  if (!email || !email.includes("@")) return false;
  const domain = email.split("@")[1].toLowerCase().trim();
  // Direct match or subdomain match
  for (const blocked of blockedDomains) {
    if (domain === blocked || domain.endsWith("." + blocked)) {
      return true;
    }
  }
  return false;
};

export default blockedDomains;
