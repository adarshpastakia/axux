/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { faker } from "@faker-js/faker";
import { Meta, StoryObj } from "@storybook/react";
import { AxContent, AxSection, AxText } from "../../src";

const meta: Meta<typeof AxContent> = {
  component: AxContent,
  title: "@core/Page Elements",
  parameters: {
    layout: "fullscreen",
    controls: { exclude: "children" },
  },
};

export default meta;
type Story = StoryObj<typeof AxContent>;

const lipsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac condimentum metus. Phasellus facilisis dignissim pharetra. In a purus tristique lectus fermentum interdum. Aenean interdum ipsum id arcu suscipit, ac tincidunt ipsum venenatis. Sed egestas augue eget pretium accumsan. Proin tincidunt sollicitudin arcu, quis tempus ante commodo non. Vestibulum fermentum dui at est dapibus, at vehicula felis cursus. Proin condimentum consequat odio, tempor tristique eros pharetra ac. Quisque eget ligula metus. Morbi sollicitudin rhoncus laoreet.

Donec cursus, est ut suscipit tristique, lectus diam condimentum nulla, nec placerat est orci vitae est. Integer eros ligula, pellentesque porta velit eget, semper volutpat odio. Sed a congue mi. Duis eget leo luctus, finibus est ac, consequat justo. In vulputate, lectus eu auctor lobortis, arcu ante placerat lorem, eu egestas lorem lectus ut massa. In aliquam tincidunt elit ut suscipit. Phasellus gravida auctor tellus, vitae maximus turpis viverra sed. Curabitur urna dolor, cursus in lectus in, suscipit luctus tellus. Donec rhoncus consequat urna tempor egestas. Maecenas sapien odio, venenatis eu sollicitudin non, luctus sed purus. Sed commodo odio tortor, nec luctus enim feugiat nec. Nullam consequat egestas gravida. Nulla convallis mauris justo, vulputate iaculis neque pharetra ut.

Nullam luctus bibendum turpis, ac auctor diam dignissim ut. Mauris gravida congue lacus sagittis efficitur. Sed ornare tortor ac felis fermentum, ut pretium neque dictum. Vivamus iaculis magna vitae auctor aliquet. Vestibulum dignissim suscipit enim, nec viverra libero blandit nec. Vestibulum vulputate enim ultricies justo pellentesque, sed vehicula diam malesuada. Fusce condimentum id ante at eleifend. Integer risus est, mattis vitae consequat et, mattis sed sem.

Phasellus hendrerit maximus nunc, eu convallis neque porttitor ac. Sed ornare, ipsum et laoreet convallis, massa augue accumsan quam, a tristique lacus elit vitae odio. Mauris maximus pulvinar elementum. Curabitur ut sapien nisi. Phasellus turpis urna, placerat non mauris eu, tincidunt sollicitudin dui. Nulla facilisi. Vivamus dapibus libero a dolor mattis, quis imperdiet quam malesuada. Donec blandit non nisl in suscipit. Fusce egestas porta elementum.

Quisque tempor at nunc in aliquet. Suspendisse nibh risus, placerat eu gravida quis, placerat in elit. Sed sit amet nisi eu est facilisis malesuada. Nunc lacinia ex eget molestie hendrerit. Sed pharetra, tellus vel vulputate pretium, nisi neque aliquet risus, ac rhoncus felis augue sit amet sapien. Nunc non lectus turpis. Nam volutpat, nibh sit amet placerat mattis, augue sapien vestibulum sem, id interdum sapien mi suscipit lacus. Suspendisse volutpat congue porta. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut imperdiet augue sed dolor pellentesque, id consequat nisi varius. Sed porttitor dui id neque sodales tristique. Fusce non suscipit tellus. Nulla congue ante erat, a interdum orci mattis sit amet. Nullam id mi nec nulla luctus laoreet. Aenean nisi ligula, laoreet ut lectus at, varius pharetra diam.

Duis a mauris pharetra, condimentum lorem sit amet, pulvinar elit. Nunc mattis ligula ac ante sagittis, vitae feugiat elit dictum. Nulla sit amet fringilla mi. Suspendisse nec leo vulputate nulla maximus blandit. Morbi arcu velit, euismod venenatis finibus eget, finibus vel purus. Suspendisse sagittis odio non lorem convallis hendrerit. Curabitur scelerisque est consequat nunc scelerisque auctor. Mauris posuere eu lectus sed convallis. Pellentesque malesuada pellentesque ipsum, sit amet sodales risus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi congue tristique turpis, id mattis elit pretium eget. Nullam rhoncus, turpis ut luctus cursus, ante orci rhoncus ante, in tincidunt est augue eu ex. Suspendisse orci sapien, pretium nec fermentum in, sodales eu sapien. Ut a augue non quam vehicula volutpat quis quis tortor. Ut ullamcorper lorem turpis, at pulvinar tortor ornare auctor.

Vestibulum ultricies bibendum mi et dignissim. Donec sed sapien vel augue sodales venenatis. Nullam dignissim dui dolor, nec ornare justo sagittis sit amet. Curabitur at dui est. Nam non placerat libero. Aliquam interdum nisl sit amet imperdiet dapibus. Duis eu egestas nibh. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus pharetra auctor velit, id sagittis nulla fringilla ac. Duis tempus imperdiet nunc, nec laoreet tellus scelerisque a. Nullam pulvinar odio eu volutpat maximus. Vestibulum nec nulla ut augue porttitor congue in ut nisl. Sed sed justo vehicula, pretium tellus non, finibus nisl.

Nullam tristique et lacus a feugiat. Nam ut ullamcorper massa. Pellentesque non augue sed mi aliquam placerat vitae varius tortor. In ullamcorper quis eros et porta. Nam vestibulum, mauris scelerisque consequat dignissim, risus ipsum imperdiet ex, vitae rutrum elit mauris at ipsum. Cras malesuada neque placerat sem tincidunt vestibulum. Vivamus ipsum erat, finibus quis massa eu, commodo aliquam metus.

Etiam luctus porta velit, nec laoreet nibh convallis eget. Sed ornare molestie faucibus. Mauris ac pulvinar lacus, vel hendrerit urna. Sed vitae dui id enim consectetur viverra. In consectetur purus enim, vel ullamcorper augue euismod tincidunt. Nullam laoreet odio mauris, id euismod magna lobortis vel. Maecenas interdum tellus euismod, laoreet turpis nec, varius sem. Pellentesque eu massa ut turpis consectetur blandit eu at magna. Nunc a sem at leo cursus maximus a vel felis. Phasellus eget justo sollicitudin, rutrum tortor in, pulvinar sapien. Donec semper scelerisque ligula vel mattis. Morbi mattis enim maximus massa hendrerit, sit amet lobortis risus dapibus. Sed eget gravida mauris.

Ut hendrerit eros at sem fermentum iaculis. Nullam imperdiet ipsum ac purus varius, eget semper justo feugiat. Maecenas a arcu eu ipsum fermentum euismod. Sed non ante in urna pretium aliquet nec non augue. Nunc fermentum arcu nec massa placerat, at egestas purus aliquam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin convallis imperdiet erat, in scelerisque erat ullamcorper eget. Proin condimentum ante sed lacinia vulputate. In malesuada diam vitae quam aliquet, a suscipit orci molestie. Praesent in ante quis tellus elementum laoreet. Proin eget neque odio. Vivamus lacus tellus, ornare nec pharetra at, laoreet sed orci. Vivamus ut imperdiet quam. Nullam eu convallis arcu. Fusce congue dui lorem, molestie hendrerit nunc scelerisque tempus. Quisque ultrices feugiat iaculis.

Nam sem elit, fermentum in nunc vel, scelerisque porta magna. Morbi eget sem sit amet enim fermentum ultrices. Donec feugiat nisl lacus. Vivamus congue ipsum justo, ut tempor neque viverra non. Sed at lectus posuere, euismod lectus vel, efficitur tortor. Cras nec ipsum neque. Donec sit amet sagittis est.

Etiam et eros justo. Etiam egestas tellus turpis, nec luctus velit auctor a. Fusce eros nisl, volutpat eget tincidunt sollicitudin, condimentum id ex. Curabitur vitae mi tempor, maximus diam ut, efficitur ante. Nam dignissim, ex vitae convallis vulputate, lorem mi dictum justo, et maximus turpis ex eget tortor. Cras mollis, odio vitae lacinia accumsan, purus augue consequat nulla, non egestas nisl est quis lectus. In id libero in ante molestie fringilla. In consequat, leo sit amet mattis bibendum, elit sem sodales felis, et pretium mauris tortor nec velit. Nam eros mi, venenatis sagittis ante et, vehicula malesuada tortor. Ut viverra pretium sapien, eu fermentum lorem accumsan vel. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum rhoncus nisi nibh, vel consectetur nulla vehicula vitae. Proin rutrum, nisi et aliquam pharetra, urna urna malesuada diam, id accumsan lorem mauris a nunc. Maecenas non enim nec ipsum lobortis volutpat.
`;

export const Content: Story = {
  render: (args) => (
    <div className="viewport-wrapper">
      <AxSection>
        <AxContent {...args}>
          <AxText>{lipsum}</AxText>
        </AxContent>
      </AxSection>
    </div>
  ),
  args: {},
};
