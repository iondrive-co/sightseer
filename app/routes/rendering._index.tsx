import React, { useEffect } from 'react';
import * as PIXI from 'pixi.js-legacy';

const PixiComponent: React.FC = () => {
  let app: PIXI.Application | null;
  let sprite: PIXI.Sprite | null;

  const setup = () => {
    if (!PIXI.Loader.shared.resources["rocket"]) return;
    sprite = new PIXI.Sprite(PIXI.Loader.shared.resources["rocket"].texture);
    sprite.x = 0;
    sprite.y = 0;
    app?.stage.addChild(sprite);
  };

  const gameLoop = () => {
    //Move the sprite 1 pixel to the right each frame
    if (sprite) sprite.x += 1;
  };

  useEffect(() => {
    app = new PIXI.Application({ 
      width: 800, 
      height: 600,
      // Any other options needed for your version of PIXI.js
    });
    document.querySelector("#pixiContainer")?.appendChild(app.view);

    PIXI.Loader.shared
      .add("rocket", "/public/favicon.ico")
      .load(setup);

    app.ticker.add(() => gameLoop());

    return () => {
      if (sprite) app?.stage.removeChild(sprite);
      sprite?.destroy();
      sprite = null;
      app = null;
    };
  }, []);

  return <div id="pixiContainer" />;
};

const RenderingIndexRoute: React.FC = () => {
  return (
    <div>
      <h1>Rendering with PixiJS</h1>
      <PixiComponent />
    </div>
  );
};

export default RenderingIndexRoute;
