import { documentsData, Document } from "../documents";

// LOV document by status
export const getDocumentsByStatusLOV = (status: Document["status"]) => documentsData.filter((d) => d.status === status).map((d) => ({ docNo: d.docNo, title: d.title }));

// detail by docNo
export const getDocumentByDocNo = (docNo: string): Document | undefined => documentsData.find((d) => d.docNo === docNo);

// buat list/table
export const getAllDocuments = (): Document[] => documentsData;
