import { Column } from "components/Flex";
import { useState } from "react";
import { styled } from "styled-components";

const Container = styled(Column)`
  padding: 24px 24px 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

type SwipeContainerProps = {
  swipeRightCallback?: CallableFunction;
  swipeLeftCallback?: CallableFunction;
  swipeUpCallback?: CallableFunction;
  swipeDownCallback?: CallableFunction;
  children: React.ReactNode;
};

export const SwipeContainer = ({
  children,
  swipeLeftCallback,
  swipeRightCallback,
}: SwipeContainerProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleTouchDown = (e: any) => {
    const touch = e.touches[0];
    setDragging(true);
    setOffset({
      x: touch.clientX - position.x,
      y: touch.clientY - position.y,
    });
  };

  const handleTouchMove = (e: any) => {
    if (dragging) {
      const touch = e.touches[0];
      setPosition({
        x: touch.clientX - offset.x,
        y: touch.clientY - offset.y,
      });
    }
  };

  const handleTouchUp = () => {
    setDragging(false);
    if (position.x > 100) {
      swipeRightCallback?.();
    } else if (position.x < -100) {
      swipeLeftCallback?.();
    }

    setPosition({ x: 0, y: 0 });
  };

  return (
    <Container
      onTouchStart={handleTouchDown}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchUp}
      onMouseLeave={handleTouchUp}
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        cursor: dragging ? "grabbing" : "grab",
        userSelect: "none", // Prevents text selection while dragging
      }}
    >
      {children}
    </Container>
  );
};
