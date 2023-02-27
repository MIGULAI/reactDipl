import React, { useEffect } from "react";
import { useState } from "react";
import { useFetching } from "../../../hooks/useFetching";
import PostService from "../../../API/PostService";
import { Document, Paragraph, Packer, Table, TableRow, TableCell, WidthType } from 'docx';
import { saveAs } from 'file-saver';
import MyButton from "../../UI/MyButton/MyButton";
import MyError from "../../UI/MyError/MyError";

const DepAuthors = () => {
    const [authors, setAuthors] = useState()

    const [authorsGet, , err] = useFetching(async () => {
        const response = await PostService.fetchAutors()
        let a = response.data.data.authors
        let res = [];
        for (let i = 0; i < a.length; i++) {
            if (a[i].PlanningStatus) {
                res.push({ orcid: a[i].Orcid, name: a[i].Name, sername: a[i].SerName, patronic: a[i].Patronic, position: a[i].PositionName, rank: a[i].RankName, degree: a[i].DegreeName })
            }
        }
        setAuthors(res)
    })


    useEffect(() => {
        authorsGet()
    }, [])


    function downloadDocument() {
        let trArr = []
        const trOne = new TableRow({
            tableHeader: true,
            children: [
                new TableCell({
                    width: {
                        size: 250,
                        type: WidthType,
                    },
                    children: [
                        new Paragraph("id"),
                    ]
                }),
                new TableCell({
                    width: {
                        size: 1500,
                        type: WidthType,
                    },
                    children: [
                        new Paragraph("Orcid"),
                    ]
                }),
                new TableCell({
                    width: {
                        size: 1500,
                        type: WidthType,
                    },
                    children: [
                        new Paragraph("Ім'я"),
                    ]
                }),
                new TableCell({
                    width: {
                        size: 1500,
                        type: WidthType,
                    },
                    children: [
                        new Paragraph("Прізвище"),
                    ]
                }),
                new TableCell({
                    width: {
                        size: 1500,
                        type: WidthType,
                    },
                    children: [
                        new Paragraph("По батькові"),
                    ]
                }),
                new TableCell({
                    width: {
                        size: 1500,
                        type: WidthType,
                    },
                    children: [
                        new Paragraph("Наукове звання"),

                    ]
                }),
                new TableCell({
                    width: {
                        size: 1500,
                        type: WidthType,
                    },
                    children: [
                        new Paragraph("Посада"),
                    ]
                }),
                new TableCell({
                    width: {
                        size: 1500,
                        type: WidthType,
                    },
                    children: [
                        new Paragraph("Ступінь"),
                    ]
                }),
            ]
        })
        trArr.push(trOne)
        for (let i = 0; i < authors.length; i++) {
            let id = i + 1
            const tr = new TableRow({

                children: [
                    new TableCell({
                        width: {
                            size: 250,
                            type: WidthType,
                        },
                        children: [
                            new Paragraph(`${id}`),
                        ]
                    }),
                    new TableCell({
                        width: {
                            size: 1500,
                            type: WidthType,
                        },
                        children: [
                            new Paragraph(authors[i].orcid),
                        ]
                    }),
                    new TableCell({
                        width: {
                            size: 1500,
                            type: WidthType,
                        },
                        children: [
                            new Paragraph(authors[i].name),
                        ]
                    }),
                    new TableCell({
                        width: {
                            size: 1500,
                            type: WidthType,
                        },
                        children: [
                            new Paragraph(authors[i].sername),
                        ]
                    }),
                    new TableCell({
                        width: {
                            size: 1500,
                            type: WidthType,
                        },
                        children: [
                            new Paragraph(authors[i].patronic),
                        ]
                    }),
                    new TableCell({
                        width: {
                            size: 1500,
                            type: WidthType,
                        },
                        children: [
                            new Paragraph(authors[i].rank),

                        ]
                    }),
                    new TableCell({
                        width: {
                            size: 1500,
                            type: WidthType,
                        },
                        children: [
                            new Paragraph(authors[i].position),
                        ]
                    }),
                    new TableCell({
                        width: {
                            size: 1500,
                            type: WidthType,
                        },
                        children: [
                            new Paragraph(authors[i].degree),
                        ]
                    }),
                ]
            })
            trArr.push(tr)
        }

        const table = new Table({
            rows: [
                ...trArr
            ]
        })
        const doc = new Document({
            sections: [
                {
                    properties: {},
                    children: [
                        table
                    ]
                }
            ]
        });
        Packer.toBlob(doc).then((blob) => {
            saveAs(blob, "myAuthorInfo.docx");
        });
    };

    return (
        <>
            {err ===''
            ?<MyButton onClick={downloadDocument}>Download Word Document</MyButton>
            :<MyError>{[err]}</MyError>
            }
        </>
    );
}
export default DepAuthors