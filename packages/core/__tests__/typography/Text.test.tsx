// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { composeStories } from "@storybook/testing-react";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import i18next from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { LIPSUM } from "../../../../storybook/components/Lipsum";
import * as stories from "../../__stories__/typography/TextStory";
import { AxText } from "../../dist";

const { TextStory, SerifStory, ColorStory } = composeStories(stories);

const AR =
  'هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام "هنا يوجد محتوى نصي، هنا يوجد محتوى نصي" فتجعلها تبدو (أي الأحرف) وكأنها نص مقروء. العديد من برامح النشر المكتبي وبرامح تحرير صفحات الويب تستخدم لوريم إيبسوم بشكل إفتراضي كنموذج عن النص، وإذا قمت بإدخال "lorem ipsum" في أي محرك بحث ستظهر العديد من المواقع الحديثة العهد في نتائج البحث. على مدى السنين ظهرت نسخ جديدة ومختلفة من نص لوريم إيبسوم، أحياناً عن طريق الصدفة، وأحياناً عن عمد كإدخال بعض العبارات الفكاهية إليها.';
const AR_MARK: AnyObject = [
  ["لصفحة ما سيلهي", "Test"],
  ["السنين", "Test"]
];

i18next
  .use(initReactI18next)
  .init({
    resources: {
      en: {}
    },
    defaultNS: "core",
    fallbackLng: ["en"],
    keySeparator: ".",

    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    }
  })
  .then();

describe("Text", () => {
  it("renders simple text", (done) => {
    const fragment = render(
      <I18nextProvider i18n={i18next}>
        <TextStory />
      </I18nextProvider>
    );
    expect(fragment.container.querySelector(".ax-text")).toBeInTheDocument();
    expect(fragment.container).toMatchSnapshot();
    fragment.unmount();
    done();
  });

  it("renders serif text", (done) => {
    const fragment = render(
      <I18nextProvider i18n={i18next}>
        <SerifStory />
      </I18nextProvider>
    );
    expect(fragment.container.querySelector(".ax-font--serif")).toBeInTheDocument();
    expect(fragment.container).toMatchSnapshot();
    fragment.unmount();
    done();
  });

  it("renders color text", (done) => {
    const fragment = render(
      <I18nextProvider i18n={i18next}>
        <ColorStory />
      </I18nextProvider>
    );
    expect(fragment.container.querySelector(".ax-bg--lightest")).toBeInTheDocument();
    expect(fragment.container.querySelector(".ax-color--secondary")).toBeInTheDocument();
    expect(fragment.container).toMatchSnapshot();
    fragment.unmount();
    done();
  });

  it("renders weighted text", (done) => {
    const fragment = render(
      <I18nextProvider i18n={i18next}>
        <TextStory weight="bold" />
      </I18nextProvider>
    );
    expect(fragment.container.querySelector(".ax-weight--bold")).toBeInTheDocument();
    expect(fragment.container).toMatchSnapshot();
    fragment.unmount();
    done();
  });

  it("renders sized text", (done) => {
    const fragment = render(
      <I18nextProvider i18n={i18next}>
        <TextStory size="md" />
        <TextStory size="10px" />
        <TextStory size={3} />
      </I18nextProvider>
    );
    expect(fragment.container.querySelector(".ax-font--md")).toBeInTheDocument();
    expect(fragment.container).toMatchSnapshot();
    fragment.unmount();
    done();
  });

  it("renders block text", (done) => {
    const fragment = render(
      <I18nextProvider i18n={i18next}>
        <TextStory block />
      </I18nextProvider>
    );
    expect(fragment.container.querySelector(".ax-block")).toBeInTheDocument();
    expect(fragment.container).toMatchSnapshot();
    fragment.unmount();
    done();
  });

  it("renders clipped text", (done) => {
    const fragment = render(
      <I18nextProvider i18n={i18next}>
        <TextStory clip={2} />
      </I18nextProvider>
    );
    expect(fragment.container.querySelector(".ax-text")).toBeInTheDocument();
    expect(fragment.container).toMatchSnapshot();
    fragment.unmount();
    done();
  });

  it("renders marked text", (done) => {
    const fragment = render(
      <I18nextProvider i18n={i18next}>
        <AxText.Marked mark={LIPSUM.text}>{LIPSUM.line}</AxText.Marked>
      </I18nextProvider>
    );
    expect(fragment.container.querySelector("mark")).toBeInTheDocument();
    expect(fragment.container).toMatchSnapshot();
    fragment.unmount();
    done();
  });

  it("renders marked text when not found", (done) => {
    let fragment = render(
      <I18nextProvider i18n={i18next}>
        <AxText.Marked mark="Test me">
          <b>{LIPSUM.line}</b>
        </AxText.Marked>
      </I18nextProvider>
    );
    expect(fragment.container.querySelector("mark")).toBeNull();
    expect(fragment.container).toMatchSnapshot();
    fragment.unmount();

    fragment = render(
      <I18nextProvider i18n={i18next}>
        <AxText.Marked mark={LIPSUM.text}>
          <b>{LIPSUM.line}</b>
        </AxText.Marked>
      </I18nextProvider>
    );
    expect(fragment.container.querySelector("mark")).toBeNull();
    expect(fragment.container).toMatchSnapshot();
    fragment.unmount();
    done();
  });

  it("renders with tooltip", async () => {
    const fragment = render(
      <I18nextProvider i18n={i18next}>
        <div className="ax-root">
          <AxText.Abbr abbr={[["IPSUM", "Test tooltip"]]}>{LIPSUM.line}</AxText.Abbr>
        </div>
      </I18nextProvider>
    );

    const el = fragment.container.querySelector("abbr") as HTMLElement;
    act(() => {
      fireEvent.mouseOver(el);
    });
    await waitFor(() => fragment.container.querySelector(".ax-tooltip"));
    expect(fragment.container).toHaveTextContent("Test tooltip");
    expect(fragment.container).toMatchSnapshot();
    act(() => {
      fireEvent.mouseOut(el);
    });
    expect(fragment.container).not.toHaveTextContent("Test tooltip");
    expect(fragment.container).toMatchSnapshot();
    fragment.unmount();
  });

  it("renders arabic with tooltip", async () => {
    const fragment = render(
      <I18nextProvider i18n={i18next}>
        <div className="ax-root">
          <AxText.Abbr abbr={AR_MARK}>{AR}</AxText.Abbr>
        </div>
      </I18nextProvider>
    );

    console.log(fragment.container.innerHTML);

    // const el = fragment.container.querySelector("abbr") as HTMLElement;
    // act(() => {
    //   fireEvent.mouseOver(el);
    // });
    // await waitFor(() => fragment.container.querySelector(".ax-tooltip"));
    // expect(fragment.container).toHaveTextContent("Test");
    // expect(fragment.container).toMatchSnapshot();
    // act(() => {
    //   fireEvent.mouseOut(el);
    // });
    // expect(fragment.container).not.toHaveTextContent("Test");
    // expect(fragment.container).toMatchSnapshot();
    fragment.unmount();
  });
});