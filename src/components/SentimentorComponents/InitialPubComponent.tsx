import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { PublicationType } from "../../store/sentimentor/types";
import { getFormatDateTime, getDateFromString } from "../../utils";
import { desktopBp } from "../../styles/variables";

const committees: { [key: string]: string } = {
  "ועדת הכנסת": "knesset",
  "ועדת הכספים": "Finance",
  "ועדת הכלכלה": "Economics",
  "ועדת החוץ והביטחון": "ForeignAffairs",
  "ועדת הפנים והגנת הסביבה": "InternalAffairs",
  "ועדת החוקה, חוק ומשפט": "huka",
  "ועדת העלייה, הקליטה והתפוצות": "Immigration",
  "ועדת החינוך, התרבות והספורט": "Education",
  "ועדת העבודה והרווחה": "Labor",
  "הוועדה לענייני ביקורת המדינה": "StateControl",
  "הוועדה לקידום מעמד האישה ולשוויון מגדרי": "Women",
  "ועדת המדע והטכנולוגיה": "Science",
  "ועדת הבריאות": "health",
  "ועדת ביטחון הפנים": "InternalSecurity",
  "ועדת מיזמי תשתית לאומיים מיוחדים ושירותי דת יהודיים": "Infrastructure",
  "הוועדה המיוחדת לענייני התמכרויות, סמים ואתגרי הצעירים בישראל": "Drugs",
  "הוועדה המיוחדת לזכויות הילד": "Children",
  "הוועדה המיוחדת לעובדים זרים": "Foreign",
  "הוועדה המיוחדת לענייני החברה הערבית": "ArabSociety",
  "הוועדה המיוחדת לעניין הקרן לאזרחי ישראל": "GasFund",
  'הוועדה המיוחדת לדיון בהצעת חוק הסדרת השימוש בקנאביס למטרות רפואיות, התשפ"ב-2021 (פ/2245/24)':
    "cannabis",
  "הוועדה המיוחדת לפניות הציבור": "Petitions",
  "ועדת האתיקה": "Ethics",
};

const InitialData = styled.div`
  overflow-y: auto;
  margin-bottom: 10px;
  max-width: 15.63vw;
  max-height: 33.85vw;
  @media screen and (max-width: ${desktopBp}) {
    max-width: 196px;
    max-height: 425px;
  }
`;

const PostKey = styled.p`
  font-weight: 700;
  word-break: break-all;
  font-size: 0.78vw;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 10px;
  }
`;

const PostValue = styled.p`
  word-break: break-all;
  font-size: 0.78vw;
  margin-bottom: 5px;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 10px;
    margin-bottom: 3px;
  }
`;

const PostLink = styled.a`
  word-break: break-all;
  color: inherit;
`;

const FileLink = styled.a`
  display: block;
  word-break: break-all;
  margin-bottom: 3px;
`;

const PostItem = styled.div`
  margin-bottom: 0.94vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 12px;
  }
`;

const PostDocLink = styled.a`
  font-weight: 700;
  font-size: 0.94vw;
  text-decoration: none;
  color: #000;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 12px;
  }
`;

const Initiators = styled.div`
  margin-bottom: 1.04vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 13px;
  }
`;

const Initiator = styled.div`
  margin-bottom: 7px;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 5px;
  }
`;

const CommitteeLink = styled.a`
  font-size: 0.73vw;
  font-weight: 500;
  color: inherit;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 10px;
  }
`;

const InitialPubComponent = React.memo(
  ({ post }: { post: PublicationType }) => {
    const { t } = useTranslation();
    const keys = Object.keys(post);
    return (
      <InitialData>
        {post._sender === "committee_session" && committees[post.committee] && (
          <PostItem>
            <CommitteeLink
              href={`https://m.knesset.gov.il/Activity/committees/${
                committees[post.committee]
              }/Pages/CommitteeMaterial.aspx?ItemID=${post.id}`}
              target="_blank"
            >
              {t("emails_committee-link")}
            </CommitteeLink>
          </PostItem>
        )}
        {keys.map((key) => {
          const keyTranslated = t(`ranking_email_${key}`);
          // don't need to show this values(endpoint name, index in column...)
          if (key[0] === "_") {
            return null;
          }

          //Return only one list of files if files lists has follewed keys
          if (
            post[key] &&
            key === "files" &&
            (post.files.hasOwnProperty("פרוטוקול מליאה") ||
              post.files.hasOwnProperty("דברי הכנסת"))
          ) {
            let listArray: any[] = [];
            listArray.push({ type: "head", item: key });

            if (post.files.hasOwnProperty("פרוטוקול מליאה")) {
              post.files["פרוטוקול מליאה"].forEach((link: string) =>
                listArray.push({ type: "link", item: link })
              );
            }

            if (post.files.hasOwnProperty("דברי הכנסת")) {
              post.files["דברי הכנסת"].forEach((link: string) =>
                listArray.push({ type: "link", item: link })
              );
            }
            return (
              <React.Fragment key={key}>
                {listArray.length > 0 ? (
                  <React.Fragment>
                    <PostKey>{keyTranslated}</PostKey>
                    {listArray.map((item: any, index: number) => {
                      return item.type === "head" ? (
                        <PostValue key={index}>{item.item}</PostValue>
                      ) : (
                        <FileLink href={item.item} key={index} target="_blank">
                          {item.item}
                        </FileLink>
                      );
                    })}
                  </React.Fragment>
                ) : (
                  <PostValue>{t("emails_data-no-data")}</PostValue>
                )}
              </React.Fragment>
            );
          }

          //Return cases when key is FILES
          if (post[key] && key === "files") {
            let listArray: any[] = [];
            let keys = Object.keys(post.files);
            keys.forEach((key) => {
              listArray.push({ type: "head", item: key });
              post.files[key].forEach((link: string) =>
                listArray.push({ type: "link", item: link })
              );
            });
            return (
              <React.Fragment key={key}>
                {listArray.length > 0 ? (
                  <React.Fragment>
                    <PostKey>{keyTranslated}</PostKey>
                    {listArray.map((item: any, index: number) => {
                      return item.type === "head" ? (
                        <PostValue key={index}>{item.item}</PostValue>
                      ) : (
                        <FileLink href={item.item} key={index} target="_blank">
                          {item.item}
                        </FileLink>
                      );
                    })}
                  </React.Fragment>
                ) : (
                  <PostValue>{t("emails_data-no-data")}</PostValue>
                )}
              </React.Fragment>
            );
          }

          //Files GOV data
          if (post[key] && key === "files_govdata") {
            const keys = Object.keys(post.files_govdata);
            const elements = keys.map((item: string, index: number) => {
              const isItemLink = /https/.test(post.files_govdata[item]);
              if (!isItemLink) {
                return (
                  <React.Fragment key={index}>
                    <PostValue>{item}</PostValue>
                    <PostValue>{post.files_govdata[item]}</PostValue>
                  </React.Fragment>
                );
              }
              return (
                <React.Fragment key={index}>
                  <PostValue>{item}</PostValue>
                  <FileLink href={post.files_govdata[item]} target="_blank">
                    {post.files_govdata[item]}
                  </FileLink>
                </React.Fragment>
              );
            });
            return elements.length > 0 ? (
              <PostItem key={key}>
                <PostKey>{keyTranslated}</PostKey>
                {elements}
              </PostItem>
            ) : (
              <PostItem>{t("emails_data-no-data")}</PostItem>
            );
          }

          // don't need to show date for sorting
          if (post[key] && key === "date_for_sorting") {
            return null;
          }

          if (post[key] && key === "front_link") {
            return (
              <PostItem key={key}>
                <PostKey>{keyTranslated}</PostKey>
                <PostLink href={post[key]} target="_blank">
                  {post[key]}
                </PostLink>
              </PostItem>
            );
          }

          //source_link_plenumal should be link
          if (post[key] && key === "source_link_plenumal") {
            return (
              <PostItem key={key}>
                <PostKey>{keyTranslated}</PostKey>
                <PostLink href={post[key]} target="_blank">
                  {post[key]}
                </PostLink>
              </PostItem>
            );
          }

          //source_link_plenum_weeklyagenda should be link
          if (post[key] && key === "source_link_plenum_weeklyagenda") {
            return (
              <PostItem key={key}>
                <PostKey>{keyTranslated}</PostKey>
                <PostLink href={post[key]} target="_blank">
                  {post[key]}
                </PostLink>
              </PostItem>
            );
          }

          //source_link_app_agenda should be link
          if (post[key] && key === "source_link_app_agenda") {
            return (
              <PostItem key={key}>
                <PostKey>{keyTranslated}</PostKey>
                <PostLink href={post[key]} target="_blank">
                  {post[key]}
                </PostLink>
              </PostItem>
            );
          }

          //file_link should be link
          if (post[key] && key === "file_link") {
            return (
              <PostItem key={key}>
                <PostKey>{keyTranslated}</PostKey>
                <PostLink href={post[key]} target="_blank">
                  {post[key]}
                </PostLink>
              </PostItem>
            );
          }

          //commity_link should be link
          if (post[key] && key === "commity_link") {
            return (
              <PostItem key={key}>
                <PostKey>{keyTranslated}</PostKey>
                <PostLink href={post[key]} target="_blank">
                  {post[key]}
                </PostLink>
              </PostItem>
            );
          }

          //committee_link should be link
          if (post[key] && key === "committee_link") {
            return (
              <PostItem key={key}>
                <PostKey>{keyTranslated}</PostKey>
                <PostLink href={post[key]} target="_blank">
                  {post[key]}
                </PostLink>
              </PostItem>
            );
          }

          //Return date_added_to_db in user time zone
          if (post[key] && key === "date_added_to_db") {
            let formatedDate = post[key];
            try {
              const dateMilliseconds: number = getDateFromString(
                post[key]
              ).getTime();
              const offset: number = new Date().getTimezoneOffset() * 60 * 1000;
              formatedDate = getFormatDateTime(
                new Date(dateMilliseconds - offset)
              );
            } finally {
              return (
                <PostItem key={key}>
                  <PostKey>{keyTranslated}</PostKey>
                  <PostValue>{formatedDate}</PostValue>
                </PostItem>
              );
            }
          }

          //Return cases when key is last_updated_date
          if (post[key] && key === "last_updated_date") {
            //cases when timestamp
            let rawDate = new Date(post[key]);
            let date = rawDate.toLocaleDateString("en-GB").replaceAll("/", "-");
            let time = rawDate.getHours() + ":" + rawDate.getMinutes();
            let formatedDate = time + " " + date;

            //Cases when string
            if (typeof post[key] === "string") formatedDate = post[key];

            return (
              <PostItem key={key}>
                <PostKey>{keyTranslated}</PostKey>
                <PostValue>{formatedDate}</PostValue>
              </PostItem>
            );
          }

          // Return cases when key is source
          if (post[key] && key === "source") {
            return (
              <PostItem key={key}>
                <PostKey>{keyTranslated}</PostKey>
                <PostLink href={post[key]} target="_blank">
                  {post[key]}
                </PostLink>
              </PostItem>
            );
          }

          // Return cases when key is daily_agenda
          if (post[key] && key === "daily_agenda") {
            return (
              <PostItem key={key}>
                <PostKey>{keyTranslated}</PostKey>
                <PostLink href={post[key]} target="_blank">
                  {post[key]}
                </PostLink>
              </PostItem>
            );
          }

          // Return cases when key is root_link
          if (post[key] && key === "root_link") {
            return (
              <PostItem key={key}>
                <PostKey>{keyTranslated}</PostKey>
                <PostLink href={post[key]} target="_blank">
                  {post[key]}
                </PostLink>
              </PostItem>
            );
          }

          // Return cases when key is source_link
          if (post[key] && key === "source_link") {
            return (
              <PostItem key={key}>
                <PostKey>{keyTranslated}</PostKey>
                <PostLink href={post[key]} target="_blank">
                  {post[key]}
                </PostLink>
              </PostItem>
            );
          }

          // Return cases when key is first_link
          if (post[key] && key === "first_link") {
            return (
              <PostItem key={key}>
                <PostKey>{keyTranslated}</PostKey>
                <PostLink href={post[key]} target="_blank">
                  {post[key]}
                </PostLink>
              </PostItem>
            );
          }

          // Return cases when key is inner_link
          if (post[key] && key === "inner_link") {
            return (
              <PostItem key={key}>
                <PostKey>{keyTranslated}</PostKey>
                <PostLink href={post[key]} target="_blank">
                  {post[key]}
                </PostLink>
              </PostItem>
            );
          }

          // Return null when key is id(we shouldn't show id)
          if (post[key] && key === "id") {
            return null;
          }

          // Return cases when key is link
          if (post[key] && key === "link") {
            return (
              <PostItem key={key}>
                <PostKey>{keyTranslated}</PostKey>
                <PostLink href={post[key]} target="_blank">
                  {post[key]}
                </PostLink>
              </PostItem>
            );
          }

          // Return cases when key is DOCX
          if (post[key] && key === "docx") {
            return (
              <PostItem key={key}>
                <PostDocLink href={post[key]} target="_blank">
                  {key}
                </PostDocLink>
              </PostItem>
            );
          }

          // Return cases when key is PDF
          if (post[key] && key === "pdf") {
            return (
              <PostItem key={key}>
                <PostDocLink href={post[key]} target="_blank">
                  {key}
                </PostDocLink>
              </PostItem>
            );
          }

          // Return cases when key is XLS
          if (post[key] && key === "xls") {
            return (
              <PostItem key={key}>
                <PostDocLink href={post[key]} target="_blank">
                  {key}
                </PostDocLink>
              </PostItem>
            );
          }

          // Cases when key is cmt_session_items array
          if (post[key] && key === "cmt_session_items") {
            return (
              <PostItem key={key}>
                <PostKey>{keyTranslated}</PostKey>
                {post[key].length > 0 ? (
                  post[key].map((item: any, index: number) => (
                    <PostValue key={index}>{item.name}</PostValue>
                  ))
                ) : (
                  <>{t("emails_data-no-data")}</>
                )}
              </PostItem>
            );
          }

          // Cases when key is plenum_session_items array
          if (post[key] && key === "plenum_session_items") {
            return (
              <PostItem key={key}>
                <PostKey>{keyTranslated}</PostKey>
                {post[key].length > 0 ? (
                  post[key].map((item: any, index: number) => (
                    <PostValue key={index}>{item.name}</PostValue>
                  ))
                ) : (
                  <>{t("emails_data-no-data")}</>
                )}
              </PostItem>
            );
          }

          // Cases when key is initiator object
          if (post[key] && key === "initiator") {
            return (
              <PostItem key={key}>
                <PostKey>{keyTranslated}</PostKey>
                <PostValue>
                  {post[key].first_name} {post[key].last_name}
                </PostValue>
                <PostValue>{post[key].email}</PostValue>
              </PostItem>
            );
          }

          // Cases when key is initiators array
          if (post[key] && key === "initiators") {
            const list = post[key].map((initiator: any, index: number) => {
              return (
                <Initiator key={index}>
                  <PostValue>
                    {initiator.first_name} {initiator.last_name}
                  </PostValue>
                  <PostValue>{initiator.email}</PostValue>
                </Initiator>
              );
            });
            return (
              <Initiators key={key}>
                <PostKey>{keyTranslated}</PostKey>
                {list.length > 0 ? list : <>{t("emails_data-no-data")}</>}
              </Initiators>
            );
          }

          // Return cases when value is primitive
          if (
            (post[key] && typeof post[key] === "string") ||
            typeof post[key] === "number"
          ) {
            return (
              <PostItem key={key}>
                <PostKey>{keyTranslated}</PostKey>
                <PostValue>{post[key]}</PostValue>
              </PostItem>
            );
          }

          // Reuturn 'null' string when primitive value doesn't exist
          if (!post[key]) {
            return (
              <PostItem key={key}>
                <PostKey>{keyTranslated}</PostKey>
                <PostValue>{t("emails_data-no-data")}</PostValue>
              </PostItem>
            );
          }
        })}
      </InitialData>
    );
  }
);

export default InitialPubComponent;
