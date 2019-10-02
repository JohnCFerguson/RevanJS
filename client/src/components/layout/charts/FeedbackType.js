import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getFeedbackTypeCount } from "../../../actions/feedbackActions";
import { PieChart, Pie, Tooltip, Sector, Cell } from "recharts";

const renderActiveShape = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  fill,
  payload,
  percent,
  value
}) => {
  const RADIAN = Math.PI / 180;

  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`Value ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const colors = ['black', 'red', 'green', 'purple', 'blue', 'silver']

class FeedbackType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feedbackType: [],
            dataType: [],
            errors: {}
        };
    }

    componentWillMount() {
      this.props.getFeedbackTypeCount();
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.errors) {
        this.setState({
          errors: nextProps.errors
        });
      }
      if (nextProps.feedbackType !== this.props.feedbackType && nextProps.feedbackType !== undefined) {
        this.setState({
          feedbackType: nextProps.feedbackType.feedbackType
        }, () => {
            let data = [];
            const feedbackList = Object.entries(this.state.feedbackType)
            for(const [key, value] of feedbackList) {
                data.push({name: value['_id'], value: value['total']})
            }
            this.setState({
                dataType: data
            });
        });
      }
    }

    render() {
        const { dataType } = this.state;

        return (
          <PieChart width={300} height={300}>
            <text
            x={130}
            y={10}
            fill="#000"
            textAnchor="middle"
            dominantBaseline="middle"
            >
            Feedback Type
            </text>
            {(
              <Pie
                activeShape={renderActiveShape}
                dataKey="value"
                data={dataType}
                cx={130}
                cy={125}
                innerRadius={0}
                outerRadius={110}
                fill="#82ca9d"
              >
              {
                dataType.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index]}/>
                ))
              }
              </Pie>
            )}
            <Tooltip />
          </PieChart>
        );
    }
}

FeedbackType.propTypes = {
  getFeedbackTypeCount: PropTypes.func.isRequired,
  feedbackType: PropTypes.object
}

const mapStateToProps = state => ({
  feedbackType: state.feedback,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getFeedbackTypeCount }
)(FeedbackType);