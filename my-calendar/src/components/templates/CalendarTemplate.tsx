import React from 'react';
// FullCalendarコンポーネント
import FullCalendar from '@fullcalendar/react';
// FullCalendarで週表示を可能にするモジュール
import timeGridPlugin from '@fullcalendar/timegrid';
// FullCalendarで月表示を可能にするモジュール
import dayGridPlugin from '@fullcalendar/daygrid';
// FullCalendarで日付や時間が選択できるようになるモジュール
import interactionPlugin from '@fullcalendar/interaction';

export const CalendarTemplate: React.FC = () => {
  return (
    <div>
      <FullCalendar
        locale="ja" // ロケール設定
        plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]} // 週表示、月表示、日付等のクリックを可能にするプラグインを設定
        initialView="dayGridMonth" // カレンダーの初期表示設定。この場合、週表示
        slotDuration="00:30:00" // 週表示した時の時間軸の単位
        selectable={true} // 日付選択を可能にする。interactionPluginが有効になっている場合のみ
        businessHours={{
          // ビジネス時間の設定
          daysOfWeek: [1, 2, 3, 4, 5], // 0:日曜 〜 7:土曜
          startTime: '00:00',
          endTIme: '24:00',
        }}
        weekends={true} // 週末を強調表示する
        titleFormat={{
          // タイトルのフォーマット（この設定の場合は「2020年7月」のように年と月で表示される）
          year: 'numeric',
          month: 'short',
        }}
        headerToolbar={{
          // カレンダーのヘッダー設定
          start: 'title', // タイトルを左に表示する
          center: 'prev, next, today', // 「前月を表示」、「次月を表示」、「今日を表示」ができるボタンを画面の中央に表示する
          end: 'dayGridMonth,timeGridWeek', // 月・週表示を切り替えるボタンを表示する
        }}
      />
    </div>
  );
};
