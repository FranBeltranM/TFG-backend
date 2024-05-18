import { RowProccessed } from '@/v1/app/importer/domain/importer'

const generateBrandModelOne = ({ row }: { row: RowProccessed }) => {
  const brandModelFilter = {
    marca_itv: row.marca_itv,
    wmi: row.bastidor_itv.slice(0, 3),
    vds: row.bastidor_itv.slice(3, 8),
  }

  const brandModelUpdate = {
    $setOnInsert: {
      marca_itv: row.marca_itv,
      wmi: row.bastidor_itv.slice(0, 3),
      vds: row.bastidor_itv.slice(3, 8),
    },
    $addToSet: {
      modelo_itv: row.modelo_itv,
    },
  }

  return {
    updateOne: {
      filter: brandModelFilter,
      update: brandModelUpdate,
      upsert: true,
    },
  }
}

export const generateBrandModelBulkInsertDTO = ({ rows }: { rows: RowProccessed[] }) => {
  return rows.map((row) => generateBrandModelOne({ row }))
}
