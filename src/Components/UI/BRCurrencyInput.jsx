import React from "react";
import { Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
export default function BRCurrencyInput(props) {
    const [values, setvalues] = React.useState({
        valorReal: null,
        brCurrency: ""
    });

    const Money = Intl.NumberFormat("BRL", {
        style: "currency",
        currency: "BRL"
    });
    function manipulaValor(inputValue) {
        var valor = inputValue;
        valor = valor + "";
        valor = parseInt(valor.replace(/[\D]+/g, ""));
        valor = valor + "";
        valor = valor.replace(/([0-9]{2})$/g, ",$1");

        if (valor.length > 6) {
            valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
        }
        setvalues({
            valorReal: (valor == "NaN"
                ? 0
                : 0.01 * parseInt(inputValue.replace(/[\D]+/g, ""))
            ).toFixed(2),
            brCurrency:
                valor == "NaN"
                    ? 0
                    : Money.format(
                        valor == "NaN"
                            ? 0
                            : 0.01 * parseInt(inputValue.replace(/[\D]+/g, ""))
                    )
        });
        props.mudaValor(
            (valor == "NaN"
                ? 0
                : 0.01 * parseInt(inputValue.replace(/[\D]+/g, ""))
            ).toFixed(2)
        )
    }

    return (
        <Stack
            component="form"
            direction={'column'}
            sx={{
                width: "100%"
            }}
            spacing={2}
            noValidate
            autoComplete="off"
        >
            <TextField
                size="small"
                value={values.brCurrency || props.brValor}
                /*                 helperText={values.valorReal || props.valorReal} */
                onChange={(event) => {
                    manipulaValor(event.target.value);
                }}
            />
        </Stack>

    );
}
