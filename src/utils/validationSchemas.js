import * as Yup from 'yup';

export const LOGIN_SCHEMA = Yup.object().shape({
    documento: Yup.number()
        .required("Documento es requerido"),
      password: Yup.string()
        // .min(8, "debe tener al menos 8 caracteres")
        .max(15, "debe tener máximo 15 caracteres")
        //.matches(
        //    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
        //    "debe tener al menos una mayúscula, una minúscula, un número y un caracter especial"
        //    )
        .required("Contraseña es requerida"),
});

export const FILE_VALIDATION_SCHEMA = Yup.object().shape({
  file: Yup.mixed()
    .required("Archivo es requerido")
    .test(
      "fileFormat",
      "El archivo debe ser un CSV, XLXS o XLS",
      (value) => {
        return (
          value &&
          ["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "text/csv"].includes(
            value[0].type
          )
        );
      }
    ),
});
