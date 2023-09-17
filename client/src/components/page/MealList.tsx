// 메뉴와 급식 종류
type Meal = [string[], string];

interface MealObject {
  breakfast: Meal | null | undefined;
  lunch: Meal | null | undefined;
  dinner: Meal | null | undefined;
}

interface MealProps {
  mealList: string[];
  mealType: string;
}

function Meal({ mealList, mealType }: MealProps) {
  const mealListString = mealList.join(', ');

  return (
    <div className="h-full min-w-0 w-full bg-blue-100 rounded-sm py-2 px-3 justify-center">
      <div className="h-full flex flex-col justify-center">
        <div className="font-semibold flex justify-center">{`<${mealType}>`}</div>
        <div className="whitespace-nowrap text-ellipsis overflow-hidden">
          {mealListString}
        </div>
      </div>
    </div>
  );
}

function MealNotFound({ mealType }: { mealType: string }) {
  return (
    <div className="h-full min-w-0 w-full bg-blue-100 rounded-sm py-2 px-3 justify-center">
      <div className="h-full flex flex-col justify-center">
        <div className="font-semibold flex justify-center">{`<${mealType}>`}</div>
        <div className="flex justify-center">급식이 없습니다.</div>
      </div>
    </div>
  );
}

export default async function MealList() {
  const apiKey = process.env.NEIS_OPENAPI_KEY as string;
  // 시도교육청코드
  const officeCode = 'E10';
  // 표준학교코드
  const schoolCode = '7310058';

  const today = new Date();
  // ex) 20230208
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const day = ('0' + today.getDate()).slice(-2);
  const todayString = '20211007';
  // const todayString = `${year}${month}${day}`;

  const url = `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${apiKey}&Type=json&ATPT_OFCDC_SC_CODE=${officeCode}&SD_SCHUL_CODE=${schoolCode}&MLSV_YMD=${todayString}`;
  const data = await fetch(url).then((res) => res.json());

  let mealObject: MealObject = { breakfast: null, lunch: null, dinner: null };

  if (data?.mealServiceDietInfo) {
    const mealList: Meal[] = data?.mealServiceDietInfo[1].row.map(
      (meal: any) =>
        [
          meal.DDISH_NM.split('<br/>').map((item: string) =>
            item.replace(/\d.*/, '')
          ),
          meal.MMEAL_SC_NM,
        ] as Meal
    );

    mealList.forEach((meal) => {
      switch (meal[1]) {
        case '조식':
          mealObject.breakfast = meal;
          break;
        case '중식':
          mealObject.lunch = meal;
          break;
        case '석식':
          mealObject.dinner = meal;
          break;
      }
    });
  }

  return (
    <div className="w-full h-full grid grid-rows-3 gap-2">
      {mealObject?.breakfast ? (
        <Meal mealList={mealObject.breakfast[0]} mealType="조식" />
      ) : (
        <MealNotFound mealType="조식" />
      )}
      {mealObject?.lunch ? (
        <Meal mealList={mealObject.lunch[0]} mealType="중식" />
      ) : (
        <MealNotFound mealType="중식" />
      )}
      {mealObject?.dinner ? (
        <Meal mealList={mealObject.dinner[0]} mealType="석식" />
      ) : (
        <MealNotFound mealType="석식" />
      )}
    </div>
  );
}
