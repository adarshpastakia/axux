// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2022
// @license   : MIT

import { AxContent, AxDivider, AxFlexBox, AxHeading, AxPage } from "@axux/core";
import viewport from "../../assets/viewport.svg";
import page from "../../assets/page.svg";
import grid from "../../assets/grid.svg";
import panel from "../../assets/panel.svg";
import button from "../../assets/button.svg";
import dropdown from "../../assets/dropdown.svg";

export const HomePage = () => {
  return (
    <AxPage>
      <AxContent>
        <AxFlexBox maxWidth={1100}>
          <AxFlexBox.Row justify="center" align="middle">
            <AxFlexBox.Col flex="auto">
              <img src="logo.png" alt="logo" height={64} />
            </AxFlexBox.Col>
            <AxFlexBox.Col flex="auto">
              <AxHeading forDisplay level={3} className="ax-row ax-row--middle">
                <span>AxUX</span>
              </AxHeading>
            </AxFlexBox.Col>
            <AxFlexBox.Col flex="full">
              <AxHeading align="center">
                React framework for building business applications
              </AxHeading>
            </AxFlexBox.Col>
          </AxFlexBox.Row>
          <AxDivider rainbow />
          <AxFlexBox.Row>
            <AxFlexBox.Col span="6@md">
              <AxFlexBox.Row noWrap>
                <AxFlexBox.Col flex="auto">
                  <img alt="icon" src={viewport} height={96} />
                </AxFlexBox.Col>
                <AxFlexBox.Col flex="fill" className="ax-padding--t">
                  <AxHeading>Viewport</AxHeading>
                  <p>Application viewport wrapper</p>
                </AxFlexBox.Col>
              </AxFlexBox.Row>
            </AxFlexBox.Col>
            <AxFlexBox.Col span="6@md">
              <AxFlexBox.Row noWrap className="">
                <AxFlexBox.Col flex="fill" className="ax-padding--t">
                  <AxHeading>Pages</AxHeading>
                  <p>Application route pages with sections</p>
                </AxFlexBox.Col>
                <AxFlexBox.Col flex="auto">
                  <img alt="icon" src={page} height={96} />
                </AxFlexBox.Col>
              </AxFlexBox.Row>
            </AxFlexBox.Col>
            <AxFlexBox.Col span="6@md">
              <AxFlexBox.Row noWrap>
                <AxFlexBox.Col flex="auto">
                  <img alt="icon" src={grid} height={96} />
                </AxFlexBox.Col>
                <AxFlexBox.Col flex="fill" className="ax-padding--t">
                  <AxHeading>Responsive</AxHeading>
                  <p>Responsive flexbox layouts</p>
                </AxFlexBox.Col>
              </AxFlexBox.Row>
            </AxFlexBox.Col>
            <AxFlexBox.Col span="6@md">
              <AxFlexBox.Row noWrap>
                <AxFlexBox.Col flex="fill" className="ax-padding--t">
                  <AxHeading>Panels</AxHeading>
                  <p>Tabbed panels</p>
                  <p>Content panels with collapse/expand functionality</p>
                </AxFlexBox.Col>
                <AxFlexBox.Col flex="auto">
                  <img alt="icon" src={panel} height={96} />
                </AxFlexBox.Col>
              </AxFlexBox.Row>
            </AxFlexBox.Col>
            <AxFlexBox.Col span="6@md">
              <a
                href="?path=/docs/core-buttons-button--button"
                className="ax-block ax-color--base ax-hover--secondary ax-hover--bg-lightest"
              >
                <AxFlexBox.Row noWrap>
                  <AxFlexBox.Col flex="auto">
                    <img alt="icon" src={button} height={96} />
                  </AxFlexBox.Col>
                  <AxFlexBox.Col flex="fill" className="ax-padding--t">
                    <AxHeading>Buttons</AxHeading>
                    <p>Action buttons and toolbar</p>
                  </AxFlexBox.Col>
                </AxFlexBox.Row>
              </a>
            </AxFlexBox.Col>
            <AxFlexBox.Col span="6@md">
              <AxFlexBox.Row noWrap>
                <AxFlexBox.Col flex="fill" className="ax-padding--t">
                  <AxHeading>Overlays</AxHeading>
                  <p>Overlay dropdowns and tooltips</p>
                </AxFlexBox.Col>
                <AxFlexBox.Col flex="auto">
                  <img alt="icon" src={dropdown} height={96} />
                </AxFlexBox.Col>
              </AxFlexBox.Row>
            </AxFlexBox.Col>
          </AxFlexBox.Row>
        </AxFlexBox>
      </AxContent>
    </AxPage>
  );
};
