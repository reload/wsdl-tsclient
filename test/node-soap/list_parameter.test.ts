import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "fs";
import { parseAndGenerate } from "../../src";
import { Logger } from "../../src/utils/logger";
import { typecheck } from "../utils/tsc";

const target = "list_parameter";

describe(target, () => {
    Logger.disabled();

    const input = `./test/resources/${target}.wsdl`;
    const outdir = "./test/generated";

    it(`${target} - generate wsdl client`, async () => {
        await parseAndGenerate(input, outdir);
    });

    it(`${target} - check definitions`, async () => {
        assert.equal(existsSync(`${outdir}/listparameter/definitions/About.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/AboutResponse.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/AddTimesheet.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/AddTimesheetCommitPerPeriod.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/AddTimesheetCommitPerPeriodResponse.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/AddTimesheetEntryByChargeCode.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/AddTimesheetEntryByChargeCodeResponse.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/AddTimesheetResponse.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/AddTimesheetWithDefaultDistribution.ts`), true);
        assert.equal(
            existsSync(`${outdir}/listparameter/definitions/AddTimesheetWithDefaultDistributionResponse.ts`),
            true,
        );
        assert.equal(existsSync(`${outdir}/listparameter/definitions/AppSetup.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/Credentials.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/DeleteTimesheetEntry.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/DeleteTimesheetEntryResponse.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/Entries.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/Entry.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/EntryError.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/EntryList.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/ErrorList.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/Filter.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/GetAppSetup.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/GetAppSetupResponse.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/GetAppSetupResult.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/GetFlexiTimecode.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/GetFlexiTimecodeResponse.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/GetFlexiTimecodeResult.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/GetFreeDimInformation.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/GetFreeDimInformationResponse.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/GetIdsParameters.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/GetIdsParametersResponse.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/GetResourceIdFromLoggedInUser.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/GetResourceIdFromLoggedInUserResponse.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/GetResourceIdFromLoggedInUserResult.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/GetTimesheet.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/GetTimesheetFilter.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/GetTimesheetFilterResponse.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/GetTimesheetFilterResult.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/GetTimesheetResponse.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/GetTimesheetValues.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/GetTimesheetValuesResponse.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/GetTimesheetValuesResult.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/GetTimesheetValuesWithRelatedColumns.ts`), true);
        assert.equal(
            existsSync(`${outdir}/listparameter/definitions/GetTimesheetValuesWithRelatedColumnsResponse.ts`),
            true,
        );
        assert.equal(existsSync(`${outdir}/listparameter/definitions/GetTimesheetWorkSchedule.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/GetTimesheetWorkScheduleResponse.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/GetTimesheetWorkScheduleResult.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/GetTitlesById.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/GetTitlesByIdResponse.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/GetTitlesByIdResult.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/IdentifierList.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/Input.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/Input1.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/Input2.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/Input3.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/Input4.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/PeriodList.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/PeriodType.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/Response.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/TimesheetItem.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/TimesheetResponseList.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/TimesheetValue.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/TimesheetValueInfo.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/TimesheetValueInfoList.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/TimesheetValueList.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/Title.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/WorkDay.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/WorkDayList.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/WorkUnit.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/WorkUnitList.ts`), true);
        assert.equal(existsSync(`${outdir}/listparameter/definitions/WorkflowLog.ts`), true);
    });

    it(`${target} - compile`, async () => {
        await typecheck(`${outdir}/listparameter/index.ts`);
    });
});
