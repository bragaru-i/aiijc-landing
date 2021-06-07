import {h} from 'preact';
import {MY_TRACKER_ID, SOCIALS} from "../constants";

export function formatDateTimeToStr(date_str) {
    if (!date_str) {
        return '';
    }
    const date = new Date(Date.parse(date_str));
    if (!date) {
        return '';
    }
    let day = date.getDate();
    if (day < 10) {
        day = '0' + day;
    }
    let month = date.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }
    let year = date.getFullYear();
    let hours = date.getHours();
    if (hours < 10) {
        hours = '0' + hours;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    return day + '.' + month + '.' + year + ' ' + hours + ':' + minutes;
}

export function formatDateToStr(date_str) {
    if (!date_str) {
        return '';
    }
    const date = new Date(Date.parse(date_str));
    if (!date) {
        return '';
    }
    let day = date.getDate();
    if (day < 10) {
        day = '0' + day;
    }
    let month = date.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }
    let year = date.getFullYear();
    return day + '.' + month + '.' + year;
}

export function formatDateSince(startDate, finishDate = null) {
    if (!startDate) {
        return '';
    }

    startDate = new Date(Date.parse(startDate));
    if (!startDate) {
        return '';
    }

    if (!finishDate) {
        finishDate = new Date();
    } else {
        finishDate = new Date(Date.parse(finishDate));
    }

    let diff = finishDate - startDate;

    if (diff < 1000) {
        return 'только что';
    }

    let seconds = Math.floor(diff / 1000);

    if (seconds < 60) {
        return seconds + ' ' + pluralize(seconds, 'секунду', 'секунды', 'секунд') + ' назад';
    }

    let minutes = Math.floor(diff / (60 * 1000));
    if (minutes < 60) {
        return minutes + ' ' + pluralize(minutes, 'минуту', 'минуты', 'минут') + ' назад';
    }

    let hours = Math.floor(diff / (60 * 60 * 1000));
    if (hours < 24) {
        return hours + ' ' + pluralize(hours, 'час', 'часа', 'часов') + ' назад';
    }

    let days = Math.floor(diff / (24 * 60 * 60 * 1000));
    if (days < 31) {
        return days + ' ' + pluralize(days, 'день', 'дня', 'дней') + ' назад';
    }

    let months = Math.floor(diff / (31 * 24 * 60 * 60 * 1000));
    if (months < 12) {
        return months + ' ' + pluralize(months, 'месяц', 'месяца', 'месяцев') + ' назад';
    }

    let years = Math.floor(diff / (12 * 31 * 24 * 60 * 60 * 1000));
    return '> ' + years + ' ' + pluralize(years, 'года', 'лет', 'лет') + ' назад';
}

export const pluralize = (number, one, two, five) => {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
        return five;
    }
    n %= 10;
    if (n === 1) {
        return one;
    }
    if (n >= 2 && n <= 4) {
        return two;
    }
    return five;
};

export function setCookie(cname, cvalue, exdays = 180, path = '/') {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=" + path;
}

export function getCookie(cname) {
    const name = cname + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export const accent = (content, searchStr) => {
    if (!!searchStr) {
        let searchWords = searchStr.split(' ')
            .map((w) => w.trim().replace('+', '\\+'))
            .filter((w) => w);

        const pattern = `(${searchWords.join('|')})`;
        const regexp = new RegExp(pattern, 'gi');

        const contentWords = content.split(regexp);

        return contentWords.map(contentWord => {
            if (contentWord.match(regexp)) {
                return <span className="highlighted">{contentWord}</span>;
            } else {
                return contentWord;
            }
        })
    }

    return content;
};

export const getFormData = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key]));
    return formData;
}

export const showError = (msg) => {
    if (window.alertify && window.alertify.error) {
        window.alertify.dismissAll();
        window.alertify.error(msg);
    } else {
        alert(msg)
    }
};

export const showSuccess = (msg) => {
    if (window.alertify && window.alertify.error) {
        window.alertify.success(msg);
    } else {
        alert(msg)
    }
};

export const truncate = (str, maxlength) => {
    if (!str) {
        return str;
    }
    return str.length > maxlength ? str.slice(0, maxlength - 1) + '…' : str
};


export const getFileName = (fileName) => {
    if (!fileName) {
        return fileName;
    }
    let unencoded = decodeURI(fileName);
    let part1 = unencoded.split('\\').splice(-1)[0];
    return part1.split('/').splice(-1)[0];
};


export const parseDisposition = (disposition) => {
    if (disposition && disposition.indexOf('attachment') !== -1) {
        let filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        let matches = filenameRegex.exec(disposition);
        if (matches != null && matches[1]) {
            return matches[1].replace(/['"]/g, '');
        }
    }
    return null;
};

export const downloadFile = async (link, filename = null) => {
    try {
        const res = await fetch(link, {credentials: "same-origin"});
        const disposition = res.headers.get("Content-Disposition");
        const blob = await res.blob();

        if (res.ok) {
            let domLink = document.createElement('a');
            domLink.download = filename || parseDisposition(disposition);
            domLink.href = URL.createObjectURL(blob);

            document.body.appendChild(domLink);
            domLink.click();
            domLink.remove();
        } else {
            showError('Что-то пошло не так. Попробуйте позже.', 'error', 3);
        }
    } catch (e) {
        showError('Что-то пошло не так. Попробуйте позже.', 'error', 3);
    }
};

export const humanizeSize = (size) => {
    let i = Math.floor(Math.log(Math.max(size, 1)) / Math.log(1024));
    return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['Б', 'КБ', 'МБ', 'ГБ', 'ТБ', 'ПБ'][i];
};

// склонение. titles = ['тренажёр', 'тренажёра', 'тренажёров']
export const declOfNum = (num, titles) => {
    num = Math.abs(num);
    return titles[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
}

export const getFullName = (last_name, first_name, email, patronymic) => {
    if (!last_name && !first_name) {
        return email || '-- Имя не указано --'
    }
    let full_name = '';
    full_name += last_name || '-';
    full_name += ' ';
    full_name += first_name || '-';
    if (patronymic) {
        full_name += ' ';
        full_name += patronymic;
    }
    return full_name;
}

export const getFullUserName = (user) => {
    const {last_name, first_name, email, patronymic} = user;
    return getFullName(last_name, first_name, email, patronymic);
}

export const pushAnalytics = (goal) => {
    try {
        window._tmr?.push?.({id: MY_TRACKER_ID, type: 'reachGoal', goal});
    } catch (e) {
    }
};

export const truncatePages = (a=1, b=1) =>
    Math.trunc(a / b) === a / b ? a / b : Math.trunc(a/ b) + 1;

export function formatHoursMinutesMoscow(date_str, utc = "msk") {
    if (!date_str) {
        return "";
    }
    let timeZone = 0;
    if (utc === "msk") timeZone = 3;

    const date = new Date(Date.parse(date_str));
    if (!date) {
        return "";
    }
    date.setHours(
      date.getHours() + timeZone,
      date.getMinutes() + date.getTimezoneOffset()
    );
    return date.toTimeString().substring(0, 5);
}

export const imageRotate = (url, degree, imageCallback) => {
    const img = new Image();
    img.src = url;

    img.onload = () => {
        const canvas = document.createElement('canvas');

        canvas.width = degree % 180 === 0 ? img.width : img.height;
        canvas.height = degree % 180 === 0 ? img.height : img.width;

        const ctx = canvas && canvas.getContext('2d');
        if (ctx && canvas) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);

            ctx.rotate((degree * Math.PI) / 180);
            ctx.drawImage(img, -img.width / 2, -img.height / 2);
            ctx.restore();

            const canvasSize = document.createElement('canvas');
            canvasSize.width = img.height;
            canvasSize.height = img.width;

            const canvasSizeCtx = canvasSize && canvasSize.getContext('2d');
            if (canvasSize && canvasSizeCtx) {
                canvasSizeCtx.drawImage(canvas, 0, 0);
            }

            const src = canvas.toDataURL();
            fetch(src)
                .then(res => res.blob())
                .then(blob => {
                    const link = URL.createObjectURL(blob);
                    imageCallback(link, img.width, img.height);
                });
        }
    };
    return null;
};

export const getSocialByProvider = (provider) =>
    SOCIALS.find(social => social.provider === provider) || null;

export const getScreen = (size) => {
    const type = size < 768 ? "mobile" : (size >= 768 && size < 1440) ? "tablet" : "desktop"
    return {width: size, screenType: type}
};

export function dataURItoBlob(dataURI) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  var byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI
    .split(',')[0]
    .split(':')[1]
    .split(';')[0];

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  var bb = new Blob([ab], { type: mimeString });
  return bb;
}

export function dataURLtoFile(dataurl, filename) {
 
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, {type:mime});
}
