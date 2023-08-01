import React, { useState, useRef } from 'react';
import Lag from 'react-lag-radar';
import { For, block } from 'million/react';
import { useVirtualizer } from '@tanstack/react-virtual';

const lotsOfElements = Array.from({ length: 5000 }, (_, i) => <div>{i}</div>);

function MillionApp() {
  const parentRef = useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: 10000,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
  });

  return (
    <>
      <div
        ref={parentRef}
        style={{
          height: `400px`,
          overflow: 'auto',
        }}
      >
        <For
          each={rowVirtualizer.getVirtualItems()}
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
          as="div"
        >
          {(virtualItem) => (
            <div
              key={virtualItem.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                fontSize: '20px',
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              Row {virtualItem.index}
              <div hidden>{lotsOfElements}</div>
            </div>
          )}
        </For>
      </div>
    </>
  );
}

function ReactApp() {
  const parentRef = useRef();

  const rowVirtualizer = useVirtualizer({
    count: 10000,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
  });

  return (
    <>
      <div
        ref={parentRef}
        style={{
          height: `400px`,
          overflow: 'auto',
        }}
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualItem) => (
            <div
              key={virtualItem.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                fontSize: '20px',
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              Row {virtualItem.index}
              <div hidden>{...lotsOfElements}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default function App() {
  const [useMillion, setMillion] = useState(true);
  return (
    <div className="mx-4">
      <div className="flex justify-center">
        <Lag />
      </div>
      <p className="mx-16 text-4xl font-semibold">
        This demo is a benchmark made with Reejs to see how virtualization holds up with
        TanStack Virtual and Million.js vs React. Note that each row contains
        5000 hidden div elements.{' '}
      </p>
      <div className="text-center mx-auto">
      <button className="my-8 px-4 py-2 rounded-md bg-indigo-600 text-2xl text-white font-bold hover:bg-indigo-700 transition-colors duration-300"
        onClick={() => setMillion(!useMillion)} style={{ fontSize: 20 }}>
        Render Mode: {useMillion ? 'Million.js' : 'React'}
      </button>
      {useMillion ? <MillionApp /> : <ReactApp />}
      </div>
    </div>
  );
};