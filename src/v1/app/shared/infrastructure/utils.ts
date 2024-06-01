export const formatDate = ({ date, format }: { date: Date; format: 'YYYY-MM-DD' | 'DD-MM-YYYY' }) => {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate()
  return format === 'YYYY-MM-DD' ? `${year}-${month}-${day}` : `${day}-${month}-${year}`
}
