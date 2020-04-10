export default {
  toCsv (params) {
    if (params) {
      const data = params.data
      const header = params.header
      const delimiter = params.delimiter
      const replacer = (key, value) => value === null ? '' : value
      let csv = data.map(row => Object.values(header).map(field => JSON.stringify(row[field], replacer)).join(delimiter))
      csv.unshift(Object.keys(header).join(delimiter))
      csv = csv.join('\r\n')
      return csv
    }
  },
  downloadCsv (csv) {
    if (csv) {
      const name = csv.name
      const file = csv.file
      const link = document.createElement('a')
      const blob = new Blob(['\ufeff', file], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      link.href = url
      link.download = name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }
}
