import {intlFormatDistance} from 'date-fns'


const customIntlFormatDistance = (date: string):string => {
    return intlFormatDistance(
        new Date(date),
        Date.now(),
        {locale: 'en'}
    )
}

export {customIntlFormatDistance}