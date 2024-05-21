import React, { ForwardedRef, useMemo, useRef, useState } from "react";
import { SignatureComponent, Signature } from "@syncfusion/ej2-react-inputs";
import styled from "styled-components";
import { getFormatDate } from "../../utils";
import PenCursor from "../../assets/images/edit-icon.png";
import { NoIcon } from "../../UI/Svg";
import { desktopBp } from "../../styles/variables";
import { activityList } from "../../config/userActivityList";

const Wrapper = styled.div`
  width: 29.95vw;
  min-width: 29.95vw;
  position: relative;
  @media screen and (max-width: ${desktopBp}) {
    width: 376px;
    min-width: 376px;
  }
  @media screen and (max-width: 700px) {
    width: 100%;
    min-width: auto;
  }
`;

const StyledSignatureWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.56vw;
  & canvas {
    cursor: url(${PenCursor}) -2 23, auto;
    border: 2px solid #000;
    height: 7.81vw;
    width: 18.23vw;
    background-size: cover;
  }
  @media screen and (max-width: ${desktopBp}) {
    gap: 20px;
    & canvas {
      height: 98px;
      width: 229px;
    }
  }
  @media screen and (max-width: 700px) {
    flex-direction: column;
  }
`;

const StyledTitle = styled.p`
  text-align: center;
  font-size: 0.78vw;
  font-weight: 700;
  margin: 0 0 0.52vw;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 10px;
    margin: 0 0 7px;
  }
`;

const StyledParagraph = styled.div`
  margin-bottom: 0.63vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 8px;
  }
`;

const StyledText = styled.p`
  font-size: 0.68vw;
  margin: 0;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 8px;
  }
`;

const StyledSignLabel = styled.p`
  font-size: 0.94vw;
  font-weight: 500;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 12px;
  }
`;

const StyledCentered = styled(StyledText)`
  text-align: center;
`;

const StyledClearBtn = styled.button`
  padding: 0.36vw;
  border-radius: 50%;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  transition: opacity 200ms linear;
  &:hover {
    opacity: 0.65;
  }
  & svg {
    height: 1.56vw;
    width: 1.56vw;
  }
  @media screen and (max-width: ${desktopBp}) {
    padding: 5px;
    & svg {
      height: 20px;
      width: 20px;
    }
  }
`;

interface IProps {
  isEdited: boolean;
  setEdited: (isEdited: boolean) => void;
  fullName?: string;
  uId?: string;
  login?: string;
}

const DigitalSignature = React.forwardRef(
  (
    { isEdited, setEdited, fullName, uId, login }: IProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    let signObj: null | Signature;

    const currentDate = useMemo(() => {
      const date = new Date();
      return {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
        fullDate: getFormatDate(date),
      };
    }, []);

    const onClear = () => {
      signObj?.clear();
      setEdited(false);
    };

    const handleChange = () => {
      setEdited(true);
    };

    return (
      <Wrapper ref={ref} dir="RTL">
        <StyledTitle>כתב התחייבות לשמירת סודיות</StyledTitle>
        <StyledParagraph>
          <StyledCentered>
            שנערך ונחתם ביום {currentDate.day} בחודש {currentDate.month} בשנת{" "}
            {currentDate.year}
          </StyledCentered>
          <StyledText>
            אני הח"מ, {fullName ? fullName : login}, הנושא ת.ז. מספר {uId},
            )להלן גם: "מקבל המידע"(
          </StyledText>
          <StyledText>
            מצהיר כי ידוע לי כי S.T.S.P software solutions )להלן גם: "מחזיק המידע"( מעביר/ה
            ו/או י/תעביר לידי מידע סודי{" "}
          </StyledText>
          <StyledText>
            /או מסווג הקשור במתפקדי ו/ה ו/או סיסמא המאפשרת גישה למידע שכזה. הנני
            מסכים ומתחייב לקבל
          </StyledText>
          <StyledText>
            את המידע, כפי שיוגדר להלן, בתנאים הקבועים בהתחייבות זו אשר נועדה
            להבטיח שמירה על סודיות
          </StyledText>
          <StyledText>מידע הסודי ו/או המסווג, כדלקמן: </StyledText>
        </StyledParagraph>
        <StyledParagraph>
          <StyledText>
            "1: מידע סודי ו/או מסווג" בהתחייבות זו – כל רשומה הנוגעת לחברי
            המפלגה, מידע או ידע, מכל מין וסוג,
          </StyledText>
          <StyledText>
            המזוהה בדרך כלשהי כמידע פוליטי ו/או מסחרי ו/או עסקי ו/או שיווקי ו/או
            מידע הקשור ברשימה , וכל מידע
          </StyledText>
          <StyledText>
            חר, לרבות, פרטים אישיים על חברי הרשימה, ו/או של צדדי ג'. לרבות מדיה
            מגנטית, שנמסר ו/או נחשף למקבל
          </StyledText>
          <StyledText>המידע</StyledText>
        </StyledParagraph>
        <StyledParagraph>
          <StyledText>2. מקבל המידע מצהיר ומתחייב כ</StyledText>
        </StyledParagraph>
        <StyledParagraph>
          <StyledText>
            2.1 יעשה כל שיידרש ממנו על ידי מחזיק המידע לשם שמירת סודיות המידע
            הסודי והמסווג ,ובכלל זה ישמור על
          </StyledText>
          <StyledText>
            המידע בסודיות מוחלטת ומלאה, ולפחות באותה מידת זהירות שהיה נוהג לשם
            הגנה על סודותיו הוא.{" "}
          </StyledText>
        </StyledParagraph>
        <StyledParagraph>
          <StyledText>
            2.2 ישמור את המידע בסוד, לא ישתמש ו/או לא יאפשר להשתמש ו/או לא ימסור
            ו/או לא יגלה ו/או לא יאפשר
          </StyledText>
          <StyledText>
            גישה אל המידע ו/או לא יעביר בכל דרך שהיא ובשום זמן שהוא, לכל אדם
            ו/או תאגיד ו/או שותפות ו/או גוף{" "}
          </StyledText>
          <StyledText>
            תקשורתי ו/או גוף כלשהו אחר, בין אם ציבורי ובין אם לא ציבורי את המידע
            הסודי והמסווג, כפי שהוגדר לעיל,
          </StyledText>
          <StyledText>
            לרבות כל מידע הקשור לרשימה, כולו ו/או חלקו, במישרין ו/או בעקיפין אשר
            נמסרו לידיעתו ו/או ימסרו לידיעתו
          </StyledText>
          <StyledText>
            או לידיעת שולחיו בכל דרך שהיא, בין אם בכתב ,בין אם בעל פה, בין אם
            באמצעות מדיה מגנטי ובין אם באמצעי
          </StyledText>
          <StyledText>אחר.</StyledText>
        </StyledParagraph>
        <StyledParagraph>
          <StyledText>
            2.3 מבלי לגרוע מהאמור, כל העברה של מידע סודי ו/או מסווג לכל אדם אחר
            תעשה באישור מראש ובכתב החתום
          </StyledText>
          <StyledText>
            בידי בא כח הרשימה ו/או מי שיורשה לכך על -ידי הרשימה )להלן: "מורשה
            החתימה"( בהתאם לשיקול דעתו
          </StyledText>
          <StyledText>הבלעדי</StyledText>
        </StyledParagraph>
        <StyledParagraph>
          <StyledText>
            2.4 לא יעתיק ו/או לא ירשה לאחרים להעתיק ו/או לא יאפשר לאחרים לבצע
            במידע הסודי ו/או המסווג ו/או בחלק
          </StyledText>
          <StyledText>
            ממנו בכל דרך אחרת, בין בשכפול, בהעתקה, בצילום, בתדפיס, בכתב ,באמצעים
            אלקטרוניים ובכל צורת העתקה
          </StyledText>
          <StyledText>
            אחרת אלא לצורך קריאת המידע; ולא יעלה על הכתב או בכל מדיה אחרת, פרטים
            כלשהם של המידע, אלא למטרה
          </StyledText>
          <StyledText>
            מצוינת לשמה נמסר המידע; על העותקים של המידע הסודי יחולו הוראות
            התחייבות זו, וכל האמור לגבי המידע
          </StyledText>
          <StyledText>הסודי והמסווג יחול גם על עותקיה.</StyledText>
        </StyledParagraph>
        <StyledParagraph>
          <StyledText>
            2.5 ינקוט בכל אמצעי הזהירות ובכל הצעדים הדרושים ו/או שידרשו לשמירת
            המידע הסודי והמסווג ומניעת
          </StyledText>
          <StyledText>
            אבדונו ו/או העברתו ו/או הגעתו לצד שלישי כלשהו כל מטרה ו/או סיבה שהיא
            למעט אם הדבר נעשה במסגרת
          </StyledText>
          <StyledText>תפקידו ובהתאם להנחיות מורשה החתימה .</StyledText>
        </StyledParagraph>
        <StyledParagraph>
          <StyledText>
            2.6 לא יפרסם בכל צורה שהיא כל נתון הנוגע למידע הסודי ו/או המסווג
            עפ"י הוראות אלה בלבד .
          </StyledText>
        </StyledParagraph>
        <StyledParagraph>
          <StyledText>
            4. התחייבות לשמירה על סודיות המידע הסודי והמסווג אינה מוגבלת בזמן
            ותהא תקפה גם לאחר סיום העבודה
          </StyledText>
          <StyledText>ו/או התפקיד בכל שלב .</StyledText>
        </StyledParagraph>
        <StyledParagraph>
          <StyledText>
            5. המידע הסודי הינו קניינו של מחזיק המידע ורק הוא יוכל להפיצה לצדדים
            נוספים, על פי שיקול דעתו הבלעדי.
          </StyledText>
          <StyledText>
            הצגת המידע הסודי, או כל חלק ממנו למקבל המידע אינה יוצרת בשום אופן
            יחסי בלעדיות בין מקבל המידע
          </StyledText>
          <StyledText>למחזיק המידע .</StyledText>
        </StyledParagraph>
        <StyledParagraph>
          <StyledText>
            6. הסכם זה כפוף לחוקי מדינת ישראל, לרבות חוק הגנת הפרטיות, התשמ"א –
            1891, ובכפוף להגדרת מידע סודי
          </StyledText>
          <StyledText>
            ו/או מסווג על פי התחייבות זו, המפר הוראות התחייבות זו דינו מאסר 5
            שנים בהתאם לסעיף 5 לחוק הגנת
          </StyledText>
          <StyledText>הפרטיות, התשמ"א- 1981</StyledText>
        </StyledParagraph>
        <StyledParagraph>
          <StyledText>
            7. מקבל המידע מצהיר כי ידוע לו שהפרת התחייבות זו עלולה לגרום למחזיק
            המידע נזקים, אשר בגינם יהיה עליו{" "}
          </StyledText>
          <StyledText>לפצות את מחזיק המידע. </StyledText>
        </StyledParagraph>
        <StyledParagraph>
          <StyledText>
            8. התחייבויותיו של מקבל המידע לפי כתב התחייבות זו הינן בלתי חוזרות.
          </StyledText>
          <StyledText>ולראיה בא מקבל המידע על החתום:</StyledText>
        </StyledParagraph>
        <StyledParagraph>
          <StyledText>תאריך {currentDate.fullDate}</StyledText>
        </StyledParagraph>
        <StyledParagraph>
          <StyledSignatureWrapper>
            <StyledSignLabel> חתימת מקבל:</StyledSignLabel>
            <SignatureComponent
              ref={(sign) => (signObj = sign)}
              minStrokeWidth={1}
              change={handleChange}
            ></SignatureComponent>
            {isEdited && (
              <StyledClearBtn onClick={onClear} data-action={activityList["clear-signature"]}>
                <NoIcon />
              </StyledClearBtn>
            )}
          </StyledSignatureWrapper>
        </StyledParagraph>
      </Wrapper>
    );
  }
);
export default DigitalSignature;
