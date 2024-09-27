export function timeSince(date: string): string {
    const seconds: number = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);

    let interval: number = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
}





// // Round negative numbers up and positive numbers down
// const round = (value: number) =>
//   value > 0 ? Math.floor(value) : Math.ceil(value);

// return {
//       const {
//         dateToCompare = new Date(),
//         showSeconds = true,
//         format,
//       } = options ?? {};

//       const locale = table.options.meta?.locale;
//       const localeText = table.options.meta?.localeText;
//       const rtf = new Intl.RelativeTimeFormat(locale, format);
//       const cellValue = cell.getValue<string | number | Date>();
//       const value = new Date(cellValue);

//       if (isNaN(value.getTime())) return '';

//       const delta = Math.floor(
//         (value.getTime() - dateToCompare.getTime()) / 1000
//       );

//       let interval = delta / (365 * 24 * 60 * 60);
//       if (Math.abs(interval) > 1) return rtf.format(round(interval), 'years');

//       interval = delta / (30 * 24 * 60 * 60);
//       if (Math.abs(interval) > 1) return rtf.format(round(interval), 'months');

//       interval = delta / (24 * 60 * 60);
//       if (Math.abs(interval) > 1) return rtf.format(round(interval), 'days');

//       interval = delta / (60 * 60);
//       if (Math.abs(interval) > 1) return rtf.format(round(interval), 'hours');

//       interval = delta / 60;
//       if (Math.abs(interval) > 1) return rtf.format(round(interval), 'minutes');

//       if (Math.abs(interval) === 0 || !showSeconds)
//         return localeText?.formatting?.now ?? 'just now';

//       return rtf.format(delta, 'seconds');

// export function timeAgoFormatter() {
    
// }
