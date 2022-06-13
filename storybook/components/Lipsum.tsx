// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { FC } from "react";

export const LIPSUM = {
  text: "Lorem ipsum",
  line: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  para: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis eros mollis, egestas mauris nec, tincidunt ipsum. Sed commodo sagittis sapien non sagittis. Vestibulum viverra sapien vitae nisi condimentum, eu malesuada velit iaculis. Duis pulvinar lobortis diam, a pharetra urna commodo non. Integer molestie pharetra enim a pulvinar. Fusce ultrices augue vel magna tincidunt, auctor efficitur lectus gravida. Nunc scelerisque urna nec augue tincidunt, ac aliquet velit facilisis.`,
  arPara:
    "لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار  النشوة وتمجيد الألم نشأت بالفعل، وسأعرض لك التفاصيل لتكتشف حقيقة وأساس تلك السعادة البشرية، فلا أحد يرفض أو يكره أو يتجنب الشعور بالسعادة، ولكن بفضل هؤلاء الأشخاص الذين لا يدركون بأن السعادة لا بد أن نستشعرها بصورة أكثر عقلانية ومنطقية فيعرضهم هذا لمواجهة الظروف الأليمة، وأكرر بأنه لا يوجد من يرغب في الحب ونيل المنال ويتلذذ بالآلام، الألم هو الألم ولكن نتيجة لظروف ما قد تكمن السعاده فيما نتحمله من كد وأسي"
};

export const Lipsum: FC<{ className?: string; type?: "text" | "line" | "para" }> = ({
  className,
  type = "line"
}) => <span className={className}>{LIPSUM[type]}</span>;
