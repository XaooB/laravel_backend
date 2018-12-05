export const dateConverter = {
  toDateOnly: date => {
    if(!date) throw new Error('You need to pass date object.');
    if(typeof date !== Date) {
      date = new Date(date)
    } else {
      throw new Error('dateConverter.toDateOnly method can receive only date objects.');
    }

    let year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate();

    return `${year}.${month < 10 ? "0" + month : month}.${day < 10 ? '0' + day : day}`;
  },
  toTimeOnly: date => {
    if(!date) throw new Error('You need to pass date object.');
  }
}
