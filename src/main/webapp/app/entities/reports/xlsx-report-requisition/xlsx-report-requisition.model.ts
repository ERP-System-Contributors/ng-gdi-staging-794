import dayjs from 'dayjs/esm';
import { IReportTemplate } from 'app/entities/reports/report-template/report-template.model';
import { IPlaceholder } from 'app/entities/system/placeholder/placeholder.model';
import { IUniversallyUniqueMapping } from 'app/entities/gdi/universally-unique-mapping/universally-unique-mapping.model';
import { ReportStatusTypes } from 'app/entities/enumerations/report-status-types.model';

export interface IXlsxReportRequisition {
  id: number;
  reportName?: string | null;
  reportDate?: dayjs.Dayjs | null;
  userPassword?: string | null;
  reportFileChecksum?: string | null;
  reportStatus?: ReportStatusTypes | null;
  reportId?: string | null;
  reportTemplate?: Pick<IReportTemplate, 'id' | 'catalogueNumber'> | null;
  placeholders?: Pick<IPlaceholder, 'id' | 'description'>[] | null;
  parameters?: Pick<IUniversallyUniqueMapping, 'id' | 'mappedValue'>[] | null;
}

export type NewXlsxReportRequisition = Omit<IXlsxReportRequisition, 'id'> & { id: null };
