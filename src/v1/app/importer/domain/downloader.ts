// Libs
import AdmZip from 'adm-zip'
import { webkit } from 'playwright'

// Utils
import { logInfo } from '@/helpers/utils'

const DGT_URL = 'https://sedeapl.dgt.gob.es/WEB_IEST_CONSULTA/microdatos.faces'

export const dateFormatterGenerator = ({ date }: { date: Date }) => {
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  const formattedDate = `${day}/${month}/${year}`

  return {
    day,
    month: (date.getMonth() + 1).toString(),
    year: year.toString(),
    formattedDate,
  }
}

export const getViewStateFromDGT = async () => {
  let viewState = null

  const browser = await webkit.launch({ slowMo: 500 })
  try {
    // open a browser
    const page = await browser.newPage()

    await page.goto(DGT_URL)
    await page.waitForTimeout(250)
    await page.locator('//*[@id="menu:listadoMenu:0:j_id48"]/input').click()
    await page.waitForTimeout(250)
    await page.locator('//*[@id="menu:listadoMenu:0:listadoSubMenu:2:j_id41"]/input').click()
    await page.waitForTimeout(250)
    await page.locator('//*[@id="accesoInformes:listadoInformesExternos:2:j_id92"]/input').click()
    viewState = await page.locator('//*[@id="rastroMigas"]/input[2]').getAttribute('value')

    await browser.close()
  } catch (error) {
    console.error('Error getting viewState from DGT', error)
  } finally {
    await browser.close()
  }

  return viewState
}

export const downloadFile = async ({ type, date }: { type: 'daily' | 'monthly'; date: Date }) => {
  const viewState = await getViewStateFromDGT()
  const { month, year, formattedDate } = dateFormatterGenerator({ date })

  if (type === 'daily') {
    logInfo(`Downloading ${type} file for ${formattedDate}`)
  } else {
    logInfo(`Downloading ${type} file for ${month}/${year}`)
  }

  const formData = new URLSearchParams({
    configuracionInfPersonalizado: 'configuracionInfPersonalizado',
    'javax.faces.ViewState': viewState ?? '',
  })

  if (type === 'daily') {
    formData.append('configuracionInfPersonalizado:filtroDiario', formattedDate)
    formData.append('configuracionInfPersonalizado:j_id115', 'Descargar')
  } else {
    formData.append('configuracionInfPersonalizado:filtroMesAnyo', year)
    formData.append('configuracionInfPersonalizado:filtroMesMes', month)
    formData.append('configuracionInfPersonalizado:j_id131', 'Descargar')
  }

  return await fetch(DGT_URL, {
    method: 'POST',
    headers: {
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'Accept-Language': 'es-ES,es;q=0.9',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'same-origin',
      'Sec-Fetch-User': '?1',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    },
    body: formData,
  })
}

export const unzipFileAndClear = async ({ path, data }: { path: string; data: ArrayBuffer }) => {
  logInfo('Unzipping file')
  new AdmZip(Buffer.from(data)).extractAllTo(path, /** overwrite **/ true)
  logInfo('Unzipping finished')
}
