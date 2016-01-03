var utils = {};

utils.sortByKey = function(array, key) {
  return array.sort(function(a, b) {
    var x = a[key]; var y = b[key];
    return ((x > y) ? -1 : ((x < y) ? 1 : 0));
  });
}

utils.firstDay = function(date) {
  return new Date(date.setDate(1));
}

utils.lastDay = function(date) {
  return new Date((new Date((new Date(date.setDate(1))).setMonth(date.getMonth() + 1))).setDate(0));
}

utils.zeroPadding = function(number) {
  if (number < 10) return '0' + number;
  return number;
}

utils.groupByMonth = function(items) {
  var group = [], months = [];
  items.map(function(item) {
    var month = new Date(item.date).toString().slice(4,7) + ' ' + new Date(item.date).toString().slice(11,15);
    var monthIndex = new Date(item.date).toString().slice(11,15) + utils.zeroPadding(new Date(item.date).getMonth());
    if (months.indexOf(month) === -1) {
      months.push(month);
      group.push({
        month: month,
        items: [item],
        monthIndex: monthIndex
      });
    }
    else {
      for (let groupMember of group) {
        if (groupMember.month === month)
          group[group.indexOf(groupMember)].items.push(item);
      }
    }
  });
  return utils.sortByKey(group, 'monthIndex');
}

export default utils;