// No browser equivalent of Telegram.WebApp.close() for a plain tab — deep-link
// back into the bot chat instead (opens the Telegram app on mobile, Telegram
// Desktop/web.telegram.org on desktop).
export const BOT_DEEP_LINK = 'https://t.me/uselinq_bot';

// When we hold a bot-link token, hand the user straight into the bot already
// linked via a start payload — t.me/<bot>?start=link_<token>. The bot's /start
// redeems it (no email/OTP re-entry). Without a token (e.g. the upgrade flow,
// where the user is already linked) this is just the plain bot link.
export function botLink(token?: string): string {
  return token ? `${BOT_DEEP_LINK}?start=link_${encodeURIComponent(token)}` : BOT_DEEP_LINK;
}
