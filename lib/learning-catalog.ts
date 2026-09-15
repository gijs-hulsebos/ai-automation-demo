export type CurriculumModule={id:string;title:string;overview:string;topics:string[];outcomes:string[];url:string};
export type CurriculumEntry={id:string;title:string;issuer:string;kind:string;parentId:string|null;status:string;completedAt:string|null;dateSource:string|null;summary:string;skills:string[];note:string;modules:CurriculumModule[];url:string;credential:string|null};
export type LearningCatalog={schemaVersion:number;repository:string;commit:string;entries:CurriculumEntry[]};
