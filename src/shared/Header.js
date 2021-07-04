import React from "react";

import { Btn, Grid, Text } from "../elements";


const Header = (props) => {

  return (
		<React.Fragment>
			<Grid is_flex padding="4px 16px">
				<Grid>
					<Text bold size="24px" margin="0px">안뇽?</Text>
				</Grid>
				<Grid is_flex>
					<Btn is_header text="회원가입"/>
					<Btn is_header text="로그인"/>
				</Grid>
			</Grid>
		</React.Fragment>
  )
}

Header.defaultProps = {}


export default Header;