/* @flow */
import * as React from "react";
import {Image, SafeAreaView, ScrollView, Text, View} from "react-native";
import {Slider} from "../src/Slider";

// constants
const thumbImage = require("./img/thumb.png");

// styles
import {
    aboveThumbStyles,
    componentThumbStyles,
    customStyles,
    styles,
} from "./styles";

const DURATION = 300;

const CustomThumb = () => (
    <View style={componentThumbStyles.container}>
        <Text>Any</Text>
    </View>
);

const AboveThumb = () => (
    <View style={aboveThumbStyles.wrapper}>
        <Image source={thumbImage} />
    </View>
);

const SliderContainer = (props: {
    caption: string,
    children: React.Node,
    sliderValue?: number | Array<number>,
}) => {
    const {caption, children} = props;

    return (
        <View>
            <View style={styles.titleContainer}>
                <Text>{caption}</Text>
            </View>
            {children}
        </View>
    );
};

class App extends React.Component<*, *> {
    state = {
        currentTime: 0,
        scrubbing: false,
        scrubbingValue: 0,
    };

    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState(prevState => ({
                currentTime: prevState.currentTime + 0.5,
            }));
        }, 500);
        setTimeout(() => {
            clearInterval(this.interval);
        }, DURATION * 1000 + 500);
    }

    onSlidingStart = () => {
        this.setState({
            scrubbing: true,
            scrubbingValue: this.props.currentTime,
        });
    };

    onValueChange = (scrubbingValue: number) =>
        this.setState({
            scrubbingValue,
        });

    onSlidingComplete = (value: number) => {
        this.setState({
            currentTime: value,
            scrubbing: false,
        });
    };

    interval: *;

    render() {
        const {currentTime, scrubbing, scrubbingValue} = this.state;
        const value = scrubbing ? scrubbingValue : currentTime;
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.container}>
                    <SliderContainer
                        caption="<Slider/> 2 thumbs, min, max, and custom tint"
                        sliderValue={value}
                    >
                        <Slider
                            animateTransition
                            maximumTrackTintColor="#d3d3d3"
                            maximumValue={20}
                            minimumTrackTintColor="#1fb28a"
                            minimumValue={4}
                            step={2}
                            thumbTintColor="#1a9274"
                            value={value}
                            onSlidingComplete={this.onSlidingComplete}
                            onSlidingStart={this.onSlidingStart}
                            onValueChange={this.onValueChange}
                        />
                    </SliderContainer>
                    <SliderContainer caption="<Slider/> with custom above thumb component">
                        <Slider
                            animateTransition
                            trackClickable
                            maximumTrackTintColor="grey"
                            maximumValue={DURATION}
                            minimumTrackTintColor="blue"
                            renderAboveThumbComponent={AboveThumb}
                            value={value}
                            onSlidingComplete={this.onSlidingComplete}
                            onSlidingStart={this.onSlidingStart}
                            onValueChange={this.onValueChange}
                        />
                    </SliderContainer>
                    <SliderContainer caption="<Slider/> with custom thumb component">
                        <Slider
                            animateTransition
                            maximumValue={DURATION}
                            renderThumbComponent={CustomThumb}
                            trackStyle={customStyles.track}
                            value={value}
                            onSlidingComplete={this.onSlidingComplete}
                            onSlidingStart={this.onSlidingStart}
                            onValueChange={this.onValueChange}
                        />
                    </SliderContainer>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export default App;
