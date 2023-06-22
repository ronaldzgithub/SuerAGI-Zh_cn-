from unittest.mock import MagicMock, patch

import pytest

from superagi.models.tool_config import ToolConfig
from superagi.models.tool_kit import ToolKit


@pytest.fixture
def mock_session():
    return MagicMock()


def test_add_or_update_existing_tool_config(mock_session):
    # Arrange
    tool_kit_id = 1
    key = "example_key"
    value = "example_value"
    existing_tool_config = ToolConfig(tool_kit_id=tool_kit_id, key=key, value="old_value")
    mock_session.query.return_value.filter_by.return_value.first.return_value = existing_tool_config

    # Act
    ToolConfig.add_or_update(mock_session, tool_kit_id, key, value)

    # Assert
    assert existing_tool_config.value == value
    mock_session.commit.assert_called_once()


def test_add_or_update_new_tool_config(mock_session):
    # Arrange
    tool_kit_id = 1
    key = "example_key"
    value = "example_value"
    mock_session.query.return_value.filter_by.return_value.first.return_value = None

    # Act
    ToolConfig.add_or_update(mock_session, tool_kit_id, key, value)

    # Assert
    # mock_session.add.assert_called_once_with(ToolConfig(tool_kit_id=tool_kit_id, key=key, value=value))
    mock_session.commit.assert_called_once()