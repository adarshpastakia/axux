// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2022
// @license   : MIT

import { Page, Section } from "../../components";
import {
  AxBox,
  AxContextMenu,
  AxFlexBox,
  AxIcon,
  AxMenu,
  useAxNotificationService
} from "@axux/core";

export const Menus = () => {
  const { message } = useAxNotificationService();
  const handleConfirmation = (id: string) => {
    message({
      text: `Menus clicked [${id}]`
    }).then();
  };
  return (
    <Page>
      <Section title="Menus">
        <AxFlexBox.Spaced>
          <AxBox width={240} className="ax-border" inline>
            <AxMenu onClick={handleConfirmation}>
              <AxMenu.Text>Text label</AxMenu.Text>
              <AxMenu.Item id="idSample" label="Simple menu" />
              <AxMenu.Divider>Divider text</AxMenu.Divider>
              <AxMenu.Item id="idRed" label="Red" color="danger" />
              <AxMenu.Item id="idGreen" label="Green" color="success" />
              <AxMenu.Item id="idBlue" label="Blue" color="info" />
              <AxMenu.Divider />
              <AxMenu.Item label="Floating Menu" isFloating>
                <AxMenu.Item id="idLine" label="Line" icon="mdi mdi-chart-line-variant" />
                <AxMenu.Item id="idCircle" label="Circle" icon="mdi mdi-selection-ellipse" />
                <AxMenu.Item id="idRectangle" label="Rectangle" icon="mdi mdi-selection" />
              </AxMenu.Item>
            </AxMenu>
          </AxBox>
          <AxBox width={240} className="ax-border" inline>
            <AxMenu onClick={handleConfirmation} withIcons>
              <AxMenu.Text icon="mdi mdi-clock">Recent Viewed</AxMenu.Text>
              <AxMenu.Item id="idHome" icon="mdi mdi-home" label="Home" />
              <AxMenu.Divider>Menu Groups</AxMenu.Divider>
              <AxMenu.Item
                label="Colors"
                icon="mdi mdi-palette"
                isCollapsable
                defaultCollapsed={false}
              >
                <AxMenu.Item
                  id="idRed"
                  label="Red"
                  icon={<AxIcon icon="mdi mdi-circle" color="danger" />}
                />
                <AxMenu.Item
                  id="idGreen"
                  label="Green"
                  icon={<AxIcon icon="mdi mdi-circle" color="success" />}
                />
                <AxMenu.Item
                  id="idBlue"
                  label="Blue"
                  icon={<AxIcon icon="mdi mdi-circle" color="info" />}
                />
              </AxMenu.Item>
              <AxMenu.Item
                label="Shapes"
                icon="mdi mdi-puzzle"
                isCollapsable
                defaultCollapsed={false}
              >
                <AxMenu.Item id="idLine" label="Line" icon="mdi mdi-chart-line-variant" />
                <AxMenu.Item id="idCircle" label="Circle" icon="mdi mdi-selection-ellipse" />
                <AxMenu.Item id="idRectangle" label="Rectangle" icon="mdi mdi-selection" />
              </AxMenu.Item>
            </AxMenu>
          </AxBox>
        </AxFlexBox.Spaced>
      </Section>

      <Section title="Menubar">
        <AxBox className="ax-border">
          <AxMenu.Bar size="md" onClick={handleConfirmation}>
            <AxMenu.Text>Label</AxMenu.Text>
            <AxMenu.Item id="idHome" icon="mdi mdi-home" label="Home" />
            <AxMenu.Divider />
            <AxMenu.Item label="Colors" icon="mdi mdi-palette" isFloating>
              <AxMenu.Item
                id="idRed"
                label="Red"
                icon={<AxIcon icon="mdi mdi-circle" color="danger" />}
              />
              <AxMenu.Item
                id="idGreen"
                label="Green"
                icon={<AxIcon icon="mdi mdi-circle" color="success" />}
              />
              <AxMenu.Item
                id="idBlue"
                label="Blue"
                icon={<AxIcon icon="mdi mdi-circle" color="info" />}
              />
            </AxMenu.Item>
            <AxMenu.Item label="Shapes" icon="mdi mdi-puzzle" isFloating>
              <AxMenu.Item id="idLine" label="Line" icon="mdi mdi-chart-line-variant" />
              <AxMenu.Item id="idCircle" label="Circle" icon="mdi mdi-selection-ellipse" />
              <AxMenu.Item id="idRectangle" label="Rectangle" icon="mdi mdi-selection" />
            </AxMenu.Item>
          </AxMenu.Bar>
        </AxBox>
      </Section>

      <Section title="Context Menu">
        <AxFlexBox.Spaced>
          <AxContextMenu
            onClick={handleConfirmation}
            menu={[
              <AxMenu key="menu">
                <AxMenu.Item id="idHome" icon="mdi mdi-home" label="Home" />
                <AxMenu.Item label="Colors" icon="mdi mdi-palette" panelId="colors" />
                <AxMenu.Item label="Shapes" icon="mdi mdi-puzzle" panelId="shapes" />
              </AxMenu>,
              <AxMenu key="colors" panelId="colors" title="Colors">
                <AxMenu.Item
                  id="idRed"
                  label="Red"
                  icon={<AxIcon icon="mdi mdi-circle" color="danger" />}
                />
                <AxMenu.Item
                  id="idGreen"
                  label="Green"
                  icon={<AxIcon icon="mdi mdi-circle" color="success" />}
                />
                <AxMenu.Item
                  id="idBlue"
                  label="Blue"
                  icon={<AxIcon icon="mdi mdi-circle" color="info" />}
                />
              </AxMenu>,
              <AxMenu key="shapes" panelId="shapes" title="Shapes">
                <AxMenu.Item id="idLine" label="Line" icon="mdi mdi-chart-line-variant" />
                <AxMenu.Item id="idCircle" label="Circle" icon="mdi mdi-selection-ellipse" />
                <AxMenu.Item id="idRectangle" label="Rectangle" icon="mdi mdi-selection" />
              </AxMenu>
            ]}
          >
            <AxBox width={320} height={180} className="ax-border" inline />
          </AxContextMenu>
        </AxFlexBox.Spaced>
      </Section>
    </Page>
  );
};
