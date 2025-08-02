import { format } from 'date-fns';

export namespace DateUtil{
    const defaultDateFormat = 'yyyy-MM-dd';
    export function convertDateFormat(date:string,formatString:string ){
        const dateTime = new Date(date);
        return format(dateTime,formatString);
    }

}