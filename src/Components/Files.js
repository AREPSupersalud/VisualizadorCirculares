/* eslint-disable no-script-url */
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import XLSX from 'xlsx';
import { make_cols } from "./makeColumns";

// Generate Order Data
function createData(typeFile, name, fields, circular) {
    return {typeFile, name, fields, circular};
}

export default class Files extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            file: {},
            data: [],
            cols: []
        };
        this.handleFile = this.handleFile.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const files = e.target.files;
        if (files && files[0]) this.setState({ file: files[0] });
    };

    handleFile() {
        /* Boilerplate to set up FileReader */
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;

        reader.onload = (e) => {
            /* Parse data */
            console.log(e);
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA : true });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_json(ws);
            /* Update state */
            this.setState({ data: data, cols: make_cols(ws['!ref']) });
        };

        if (rABS) {
            reader.readAsBinaryString(this.state.file);
        } else {
            reader.readAsArrayBuffer(this.state.file);
        };
    }

    render() {
        const {classes} = this.props;
        const listRows = [];
        this.state.data.forEach((row) => {
            listRows.push(createData(row.Archivo ? (row.Archivo.length === 3 ? row.Archivo : "") : "", row.Nombre, row.Datos, row.Circular));
        });
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-md-8">
                        <input type="file" className="form-control" id="file" onChange={this.handleChange}/>
                    </div>
                    <div className="col-md-4">
                        <input type='submit'
                               className="btn"
                               value="Subir"
                               onClick={this.handleFile}/>
                    </div>
                </div>
                <Title>Archivos</Title> {/* de la Circular 047*/}
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Archivo Tipo</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Campos</TableCell>
                            <TableCell>Circular</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listRows.map(row => (
                            <TableRow key={row.typeFile}>
                                <TableCell>{row.typeFile}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.fields}</TableCell>
                                <TableCell>{row.circular}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </React.Fragment>
        );
    }
}