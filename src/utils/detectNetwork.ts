
export const detectNetwork = (url: string) => {
    if (url.match("tiktok.com")) return "tiktok"
    if (url.match("twitter.com")) return "twitter"
    if (url.match("youtube.com")) return "youtube"
    if (url.match("t.me")) return "telegram"
    if (url.match("instagram.com")) return "instagram"
    if (url.match("facebook.com")) return "facebook"

}