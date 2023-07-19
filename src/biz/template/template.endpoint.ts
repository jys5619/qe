import endpointUtil from '../common/endpoint.util';
import { ITemplate, ITemplateDto, ITemplateInfo, ITemplateVariable, ITemplateVariableDto } from './template.entity';
import { templateService } from './template.service';

/**
 * Template 목록 조회
 * @param searchKeyword
 * @returns
 */
// async function getTemplateList(searchKeyword: string): Promise<ITemplate[]> {
//   return endpointUtil
//     .getList<ITemplateDto>(window.api.selectITemplateList(searchKeyword || ''))
//     .then((datalist: ITemplateDto[]) => {
//       return datalist.map((data: ITemplateDto) => {
//         return templateService.convertITemplate(data);
//       });
//     });
// }

/**
 * Template 정보 저장
 * id가 null, undefined, 1보다 작은경우 신규로 등록된다.
 * @param templateDto
 * @returns
 */
async function saveTemplate(templateInfo: ITemplateInfo, templateVariableList: ITemplateVariable[], templateList: ITemplate[], ): Promise<number> {
  const templateInfoDto = templateService.convertITemplateInfoDto(templateInfo);
  const templateVariableDtoList: ITemplateVariableDto[] = templateVariableList.map(templateVariable => templateService.convertITemplateVariableDto(templateVariable));
  const templateDtoList: ITemplateDto[] = templateList.map(template => templateService.convertITemplateDto(template));
  return await endpointUtil.post(window.api.saveITemplate(templateInfoDto, templateVariableDtoList, templateDtoList));
}

const templateEndpoint = {
  // getTemplateList,
  saveTemplate,
};

export { templateEndpoint };
