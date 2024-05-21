import { getFormatDate } from ".";

type DataType = {[key: string]: any}

export const convertRowData = (initialData: DataType, rowData: DataType): DataType => {
    const formData: { [key: string]: any } = {};

      for (const column in rowData) {
          if (column === "job") continue;
          // Pass city code when city is string
          if (
            column === "city" &&
            initialData?.city_code &&
            typeof rowData.city === "string"
          ) {
            formData.city = initialData?.city_code;
            continue;
          }
          // Pass street code when street is string
          if (
            column === "street" &&
            initialData?.street_code &&
            typeof rowData.street === "string"
          ) {
            formData.street = initialData?.street_code;
            continue;
          }
          if (rowData[column] !== "" || initialData[column] !== null) {
            let val = rowData[column];
            if (typeof val === "boolean") {
              val = Number(val);
            }
            if (Array.isArray(val)) {
              if (val[0] instanceof Date && val[1] instanceof Date) {
                val = [getFormatDate(val[0]), getFormatDate(val[1])].join(
                  " - "
                );
              } else {
                val = "";
              }
            }
            if (val !== "" || initialData[column] !== null) {
              if (typeof val === "object") {
                val = val ? [getFormatDate(val)].join(" - ") : val;
              }
              formData[column] = val;
            }
            if (
              column === "institution" &&
              Array.isArray(rowData.institution)
            ) {
              val = rowData.institution.map((id: number) => ({
                inst_code: id,
              }));
              formData[column] = val;
            }
          }
        }


    return formData
}