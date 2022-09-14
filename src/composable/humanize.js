export const humanize = {
  sockets: value => {
    const map = {
      'None': 'Without sockets',
      'Few': 'Few sockets',
      'Many': 'Many sockets',
    }

    return map[value]
  },

  noise: value => {
    const map = {
      'Quite': 'Quite place',
      'Medium': 'Medium noise',
      'Noisy': 'Noisy place',
    }

    return map[value]
  },

  busyness: value => {
    const map = {
      'Low': 'Low busyness',
      'Average': 'Average busyness',
      'High': 'Busy place',
    }

    return map[value]
  },

  size: value => {
    const map = {
      'Small': 'Small size',
      'Average': 'Average size',
      'Big': 'Big size',
    }

    return map[value]
  },

  view: value => {
    const map = {
      'Street': 'Street view',
      'Garden': 'Garden view',
      'Sea': 'Sea view',
    }

    return map[value]
  },

  cuisine: value => {
    const map = {
      'Coffee & snacks': 'Coffee & snacks',
      'Full': 'Good for lunch',
    }

    return map[value]
  }
}
