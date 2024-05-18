import { RowProccessed, allFieldsFromFile } from '@/helpers/importer/parser-datafiles'

const replaceMultipleValues = ({ line, array, newValue }: { line: string; array: string[]; newValue: string }) => {
  // Utilizamos el método replace junto con una expresión regular
  // y una función de reemplazo para realizar el reemplazo
  return array
    .reduce((acc, current) => {
      return acc.replaceAll(current, newValue)
    }, line)
    .trim()
}

const formatContent = ({ field, content }: { field: string; content: string }) => {
  let contentReturned = content

  if (field === 'bastidor_itv') {
    contentReturned = replaceMultipleValues({
      line: content,
      array: ['*', '-', '.', ' '],
      newValue: '',
    })
  }

  if (field === 'modelo_itv') {
    contentReturned = replaceMultipleValues({
      line: content,
      array: ['*', '-', '.', ' '],
      newValue: '',
    })
  }

  return contentReturned.trim()
}

export const formatRowAllFields = ({ row }: { row: string }) => {
  return Object.keys(allFieldsFromFile)
    .map((field) => {
      const value = allFieldsFromFile[field]

      const content = formatContent({
        field,
        content: row.slice(value.start, value.end),
      })

      if (value.specialValues !== undefined) {
        if (value.specialValues.includes(content)) {
          return {
            [field]: value.specialReturn,
          }
        }
      }

      if (value.type === 'Date') {
        if (content === '') {
          return {
            [field]: null,
          }
        }

        const fecha = new Date(
          Date.parse(content.substring(4, 8) + '-' + content.substring(2, 4) + '-' + content.substring(0, 2))
        )
        return {
          [field]: fecha,
        }
      }

      return {
        [field]: value.type === 'number' ? +content : content.toLocaleUpperCase('es-ES'),
      }
    })
    .reduce((acc, current) => {
      return { ...acc, ...current }
    }, {}) as RowProccessed
}
